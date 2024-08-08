package com.zpet.ms_service.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_service.mapper.ServiceMapper;

@Repository
public class ServiceRepository {
    
    @Autowired ServiceMapper serviceMapper;

}
