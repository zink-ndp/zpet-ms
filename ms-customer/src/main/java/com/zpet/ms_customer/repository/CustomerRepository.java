package com.zpet.ms_customer.repository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_customer.mapper.CustomerMapper;
import com.zpet.ms_customer.model.Address;
import com.zpet.ms_customer.model.Customer;
import com.zpet.ms_customer.model.Point;
import com.zpet.ms_customer.request.AddressAddRequest;
import com.zpet.ms_customer.request.CustomerAddRequest;
import com.zpet.ms_customer.request.LoginRequest;

@Repository
public class CustomerRepository {

   @Autowired
   CustomerMapper customerMapper;
   
   // GET
   public Integer lastId(Map<String, Object> params){
      return customerMapper.lastId(params);
   }
   
   public Customer getByLogin(LoginRequest request) {
	   return customerMapper.getByLogin(request);
   }

   public List<Customer> getAll(Map<String, Object> params) {
      return customerMapper.getAll(params);
   }

   public Customer getById(Map<String, Object> params) {
      return customerMapper.getById(params);
   }

   public Customer getByPhone(Map<String, Object> params) {
      return customerMapper.getByPhone(params);
   }

   public List<Address> getAddresses(Map<String, Object> params) {
      return customerMapper.getAddresses(params);
   }

   public List<Point> getPoints(Map<String, Object> params) {
      return customerMapper.getPoints(params);
   }


   // INSERT
   public void add(CustomerAddRequest customer){
      customerMapper.addCustomer(customer);
   }

   public void addAddress(AddressAddRequest address){
      customerMapper.addAddress(address);
   }

   // UPDATE
   public void update(Map<String, Object> params){
      customerMapper.updateCustomer(params);
   }


}
