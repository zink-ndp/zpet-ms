package com.zpet.ms_customer.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zpet.ms_customer.request.PointChangeRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.zpet.ms_customer.model.Address;
import com.zpet.ms_customer.model.Customer;
import com.zpet.ms_customer.model.Point;
import com.zpet.ms_customer.repository.CustomerRepository;
import com.zpet.ms_customer.request.AddressAddRequest;
import com.zpet.ms_customer.request.CustomerAddRequest;
import com.zpet.ms_customer.request.LoginRequest;
import com.zpet.ms_customer.util.FunctionUtils;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    FunctionUtils functionUtils;

    public List<Customer> getAll(Map<String, Object> params) {
        List<Customer> customers = customerRepository.getAll(params);
        customers.forEach(c -> {
            c.setDateCreated(functionUtils.formatDate(c.getDateCreated(), "dd/MM/yyyy"));
        });
        return customers;
    }

    public Customer getByLogin(LoginRequest request) {
        return customerRepository.getByLogin(request);
    }

    public Customer getById(Map<String, Object> params) {
        Customer customer = customerRepository.getById(params);
        customer.setDateCreated(functionUtils.formatDate(customer.getDateCreated(), "dd/MM/yyyy"));
        return customer;
    }

    public Customer getByPhone(Map<String, Object> params) {
        Customer customer = customerRepository.getByPhone(params);
        customer.setDateCreated(functionUtils.formatDate(customer.getDateCreated(), "dd/MM/yyyy"));
        return customer;
    }

    public List<Address> getAddresses(Map<String, Object> params) {
        return customerRepository.getAddresses(params);
    }

    public List<Point> getPoints(Map<String, Object> params) {
        List<Point> points = customerRepository.getPoints(params);
        if (points.isEmpty()) return null;
        points.forEach(p -> {
            p.setTime(functionUtils.formatDate(p.getTime(), "yyyy-MM-dd HH:mm:ss"));
        });
        return points;
    }

    // INSERT
    @Transactional
    public void add(CustomerAddRequest customer) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("column", "CTM_ID");
        params.put("table", "customer");
        Integer lastId = customerRepository.lastId(params) + 1;
        customer.setId(lastId);
        customerRepository.add(customer);
    }

    @Transactional
    public void addAddress(AddressAddRequest address) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("column", "ADR_ID");
        params.put("table", "address");
        Integer lastId = customerRepository.lastId(params) + 1;
        address.setAddressId(lastId);
        customerRepository.addAddress(address);
    }

    @Transactional
    public void updatePoint(PointChangeRequest request) {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String timeNow = now.format(formatter);
        request.setTime(timeNow);
        customerRepository.addTiming(timeNow);
        Map<String, Object> param = new HashMap<>();
        param.put("id", request.getCustomerId());
        if (getPoints(param)!=null && !getPoints(param).isEmpty()) {
            Point oldPoint = getPoints(param).get(0);
            if (request.getIsEarn() == 1){
                request.setTotal(oldPoint.getTotal() + request.getChange());
            } else {
                request.setTotal(oldPoint.getTotal() - request.getChange());
            }
        } else {
            request.setTotal(request.getChange());
        }
        customerRepository.changePoint(request);
    }

    // UPDATE
    @Transactional
    public void update(Map<String, Object> params) {
        customerRepository.update(params);
    }

}
