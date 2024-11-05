package com.zpet.ms_service.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.zpet.ms_service.request.ServiceRateRequest;
import com.zpet.ms_service.request.ServiceUpdateRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.zpet.ms_service.model.Customer;
import com.zpet.ms_service.model.Rate;
import com.zpet.ms_service.model.Service;
import com.zpet.ms_service.repository.ServiceRepository;
import com.zpet.ms_service.response.RateResponse;

@org.springframework.stereotype.Service
public class ServiceService {

    @Autowired
    ServiceRepository serviceRepository;

    public List<Service> getAll(Map<String, Object> params) {
        return serviceRepository.getAll(params);
    }

    public List<RateResponse> getRate(Integer serviceId) {
        List<Rate> rates = serviceRepository.getRate(serviceId);
        List<RateResponse> rateResponses = new ArrayList<>();

        for (Rate rate : rates) {
            RateResponse rRes = new RateResponse();
            BeanUtils.copyProperties(rate, rRes);
            RestTemplate restTemplate = new RestTemplate();

            Customer c = restTemplate.getForObject("http://localhost:8900/api/customer/byid?id=" + rate.getCustomerId(), Customer.class);
            if (c != null) {
                rRes.setCustomerName(c.getName());
            }
            rateResponses.add(rRes);
        }

        return rateResponses;
    }

    public Integer isRated(Map<String, Object> params) {
        return serviceRepository.isRated(params);
    }

    @Transactional
    public void create(Service service) {
        Integer nextId = serviceRepository.lastId() + 1;
        service.setId(nextId);
        serviceRepository.create(service);
    }

    @Transactional
    public void insertRate(ServiceRateRequest request) {
        Integer nextId = serviceRepository.lastRateId() + 1;
        request.setId(nextId);
        serviceRepository.insertRate(request);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object> callAPIUpdateInclude = restTemplate.getForEntity("http://localhost:8900/api/invoice/updateInclude?srvId="+request.getServiceId()+"&invId="+request.getInvoiceId(), Object.class);
        Object updInclude = callAPIUpdateInclude.getBody();
    }

    @Transactional
    public void update(ServiceUpdateRequest service) {
        serviceRepository.update(service);
    }

    public void updateAvailable(Integer id) {
        serviceRepository.updateAvailable(id);
    }

}
