package com.zpet.ms_service.mapper;

import java.util.List;
import java.util.Map;

import com.zpet.ms_service.request.ServiceRateRequest;
import com.zpet.ms_service.request.ServiceUpdateRequest;
import org.apache.ibatis.annotations.Mapper;

import com.zpet.ms_service.model.Rate;
import com.zpet.ms_service.model.Service;

@Mapper
public interface ServiceMapper {

    public Integer lastId();

    public Integer lastRateId();

    public List<Service> getAll(Map<String, Object> params);

    public List<Rate> getRate(Integer id);

    public Integer isRated(Map<String, Object> params);

    public void create(Service service);

    public void insertRate(ServiceRateRequest request);

    public void update(ServiceUpdateRequest service);

    public void updateAvailable(Integer id);

}
