package com.zpet.ms_service.controller;

import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zpet.ms_service.request.ServiceRateRequest;
import com.zpet.ms_service.request.ServiceUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.zpet.ms_service.model.Service;
import com.zpet.ms_service.response.RateResponse;
import com.zpet.ms_service.service.ServiceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;


@RestController
@RequestMapping("/api/service")
public class ServiceController {

    @Autowired
    ServiceService serviceService;

    @GetMapping("/all")
    public List<Service> getAll(
            @RequestParam(required = false) Integer id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Double fromPrice,
            @RequestParam(required = false) Double toPrice,
            @RequestParam(required = false) Integer isAvailable
    ) {
        Map<String, Object> params = new HashMap<>();
        if (id != null) params.put("id", id);
        if (name != null) params.put("name", "%" + name + "%");
        if (isAvailable != null) params.put("isAvailable", isAvailable);
        if (fromPrice != null && toPrice != null) {
            params.put("fromPrice", fromPrice);
            params.put("toPrice", toPrice);
        }
        List<Service> services = serviceService.getAll(params);
        DecimalFormat decimalFormat = new DecimalFormat("#.#");
        services.forEach(s -> {
            if (s.getRating() != null){
                s.setRating(Double.valueOf(decimalFormat.format(s.getRating())));
            }
        });
        return services;
    }

    @GetMapping("/rates")
    public List<RateResponse> getRates(@RequestParam Integer id) {
        return serviceService.getRate(id);
    }

    @GetMapping("/isRated")
    public Integer getIsRated(@RequestParam Integer srvId, @RequestParam Integer invId) {
        Map<String, Object> params = new HashMap<>();
        params.put("srvId", srvId);
        params.put("invId", invId);
        return serviceService.isRated(params);
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createService(@RequestBody Service service) {
        serviceService.create(service);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/rate")
    public ResponseEntity<Object> rateService(@RequestBody ServiceRateRequest request) {
        serviceService.insertRate(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/update")
    public ResponseEntity<Object> updateService(@RequestBody ServiceUpdateRequest service) {
        try {
            serviceService.update(service);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/updateAvailable")
    public ResponseEntity<Object> updateServiceAvailability(@RequestParam Integer id) {
        try {
            serviceService.updateAvailable(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
