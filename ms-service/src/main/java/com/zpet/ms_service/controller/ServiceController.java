package com.zpet.ms_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.zpet.ms_service.service.ServiceService;

@RestController
public class ServiceController {
    
    @Autowired ServiceService serviceService;

}
