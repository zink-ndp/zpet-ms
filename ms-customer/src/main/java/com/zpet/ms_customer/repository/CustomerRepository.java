package com.zpet.ms_customer.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_customer.mapper.CustomerMapper;

@Repository
public class CustomerRepository {
    
 @Autowired CustomerMapper customerMapper;

}
