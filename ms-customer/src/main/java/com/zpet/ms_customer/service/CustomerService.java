package com.zpet.ms_customer.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zpet.ms_customer.model.Address;
import com.zpet.ms_customer.model.Customer;
import com.zpet.ms_customer.model.Point;
import com.zpet.ms_customer.repository.CustomerRepository;
import com.zpet.ms_customer.request.AddressAddRequest;
import com.zpet.ms_customer.request.CustomerAddRequest;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    public List<Customer> getAll(Map<String, Object> params) {
        return customerRepository.getAll(params);
    }

    public Customer getById(Map<String, Object> params) {
        return customerRepository.getById(params);
    }

    public Customer getByPhone(Map<String, Object> params) {
        return customerRepository.getByPhone(params);
    }

    public List<Address> getAddresses(Map<String, Object> params) {
        return customerRepository.getAddresses(params);
    }

    public List<Point> getPoints(Map<String, Object> params) {
        return customerRepository.getPoints(params);
    }

    // INSERT
    @Transactional
    public void add(CustomerAddRequest customer){
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("column", "CTM_ID");
        params.put("table", "customer");
        Integer lastId = customerRepository.lastId(params) + 1;
        customer.setId(lastId);
        customerRepository.add(customer);
    }

    @Transactional
    public void addAddress(AddressAddRequest address){
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("column", "ADR_ID");
        params.put("table", "address");
        Integer lastId = customerRepository.lastId(params) + 1;
        address.setAddressId(lastId);
        customerRepository.addAddress(address);
    }

    // UPDATE
    @Transactional
    public void update(Map<String, Object> params){
        customerRepository.update(params);
     }

}
