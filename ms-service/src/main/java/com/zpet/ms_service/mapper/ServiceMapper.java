package com.zpet.ms_service.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.zpet.ms_service.model.Service;

@Mapper
public interface ServiceMapper {

    public Integer lastId();

    public List<Service> getAll(Map<String, Object> params);

    public void create(Service service);

    public void update(Service service);

}
