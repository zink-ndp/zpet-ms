package com.zpet.ms_service.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
    
    public List<RateResponse> getRate(Integer serviceId){
    	List<Rate> rates = serviceRepository.getRate(serviceId);
    	List<RateResponse> rateResponses = new ArrayList<>();
    	
    	for (int i = 0; i < rates.size(); i++) {
			RateResponse rRes = new RateResponse();
			BeanUtils.copyProperties(rates.get(i), rRes);
			RestTemplate restTemplate = new RestTemplate();
			
			Customer c = restTemplate.getForObject("http://localhost:8900/api/customer/byid?id="+rates.get(i).getComment(), Customer.class);
			if (c != null) {
                rRes.setCustomerName(c.getName());
            } 
			rateResponses.add(rRes);
		}
    	
    	return rateResponses;
    }

    @Transactional
    public void create(Service service){
        Integer nextId = serviceRepository.lastId() + 1;
        service.setId(nextId);
        serviceRepository.create(service);
    }

    @Transactional
    public void update(Service service){
        serviceRepository.create(service);
    }

}
