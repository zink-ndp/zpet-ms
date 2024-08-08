package com.zpet.ms_customer.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.zpet.ms_customer.service.CustomerService;

@RestController
public class CustomerController {
    
    @Autowired CustomerService customerService;

}
