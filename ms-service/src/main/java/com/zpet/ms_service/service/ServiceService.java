package com.zpet.ms_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zpet.ms_service.repository.ServiceRepository;

@Service
public class ServiceService {
    
    @Autowired ServiceRepository serviceRepository;

}
