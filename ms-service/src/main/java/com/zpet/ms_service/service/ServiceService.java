package com.zpet.ms_service.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.zpet.ms_service.model.Service;
import com.zpet.ms_service.repository.ServiceRepository;

@org.springframework.stereotype.Service
public class ServiceService {

    @Autowired
    ServiceRepository serviceRepository;

    public List<Service> getAll(Map<String, Object> params) {
        return serviceRepository.getAll(params);
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
