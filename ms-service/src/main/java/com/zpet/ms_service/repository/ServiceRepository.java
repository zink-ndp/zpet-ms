package com.zpet.ms_service.repository;

import java.util.List;
import java.util.Map;

import com.zpet.ms_service.request.ServiceRateRequest;
import com.zpet.ms_service.request.ServiceUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_service.mapper.ServiceMapper;
import com.zpet.ms_service.model.Rate;
import com.zpet.ms_service.model.Service;

@Repository
public class ServiceRepository {

    @Autowired
    ServiceMapper serviceMapper;

    public Integer lastId() {
        Integer lastId = serviceMapper.lastId();
        return lastId != null ? lastId : 0;
    }

    public Integer lastRateId() {
        Integer lastId = serviceMapper.lastRateId();
        return lastId != null ? lastId : 0;
    }

    public List<Service> getAll(Map<String, Object> params) {
        return serviceMapper.getAll(params);
    }

    public List<Rate> getRate(Integer serviceId) {
        return serviceMapper.getRate(serviceId);
    }

    public Integer isRated(Map<String, Object> params) {
        return serviceMapper.isRated(params);
    }

    public void create(Service service) {
        serviceMapper.create(service);
    }

    public void insertRate(ServiceRateRequest request) {
        serviceMapper.insertRate(request);
    }

    public void update(ServiceUpdateRequest service) {
        serviceMapper.update(service);
    }

    public void updateAvailable(Integer id) {
        serviceMapper.updateAvailable(id);
    }

}
