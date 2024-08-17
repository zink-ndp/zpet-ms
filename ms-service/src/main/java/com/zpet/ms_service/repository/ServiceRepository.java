package com.zpet.ms_service.repository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_service.mapper.ServiceMapper;
import com.zpet.ms_service.model.Rate;
import com.zpet.ms_service.model.Service;

@Repository
public class ServiceRepository {

    @Autowired
    ServiceMapper serviceMapper;

    public Integer lastId(){
        return serviceMapper.lastId();
    }

    public List<Service> getAll(Map<String, Object> params) {
        return serviceMapper.getAll(params);
    }

    public List<Rate> getRate(Integer serviceId){
    	return serviceMapper.getRate(serviceId);
    }
    
    public void create(Service service){
        serviceMapper.create(service);
    }

    public void update(Service service){
        serviceMapper.update(service);
    }


}
