package com.zpet.ms_customer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zpet.ms_customer.repository.CustomerRepository;

@Service
public class CustomerService {
    
    @Autowired CustomerRepository customerRepository;

}
