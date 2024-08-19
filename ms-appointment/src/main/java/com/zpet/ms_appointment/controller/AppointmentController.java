package com.zpet.ms_appointment.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zpet.ms_appointment.request.AddAppointmentRequest;
import com.zpet.ms_appointment.response.AppointmentResponse;
import com.zpet.ms_appointment.service.AppointmentService;
import com.zpet.ms_appointment.utils.FunctionUtils;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;
    
    @Autowired
    FunctionUtils funcUtils;

    @GetMapping("/all")
    public List<AppointmentResponse> getAll(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer id,
            @RequestParam(required = false) String dateFilter,
            @RequestParam(required = false) Integer customerId) {
        Map<String, Object> params = new HashMap<String, Object>();
        if (status != null)
            params.put("status", funcUtils.seperateString(status));
        if (id != null)
            params.put("id", id);
        
        if (dateFilter != null && dateFilter != "") {        	
        	params.put("dateFrom", funcUtils.convertStringToDate(dateFilter.split("_")[0]));
        	params.put("dateTo", funcUtils.convertStringToDate(dateFilter.split("_")[1]));
        }
        if (customerId != null)
            params.put("customerId", customerId);
        return appointmentService.getAll(params);
    }
    
    @PostMapping("/create")
    @Transactional
    public ResponseEntity<Object> create(@RequestBody AddAppointmentRequest request){
    	appointmentService.createAppointment(request);
    	return ResponseEntity.ok().build();
    }

}
