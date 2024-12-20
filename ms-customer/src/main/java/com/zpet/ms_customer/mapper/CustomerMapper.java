package com.zpet.ms_customer.mapper;

import java.util.List;
import java.util.Map;

import com.zpet.ms_customer.request.PointChangeRequest;
import org.apache.ibatis.annotations.Mapper;

import com.zpet.ms_customer.model.Address;
import com.zpet.ms_customer.model.Customer;
import com.zpet.ms_customer.model.Point;
import com.zpet.ms_customer.request.AddressAddRequest;
import com.zpet.ms_customer.request.CustomerAddRequest;
import com.zpet.ms_customer.request.LoginRequest;

@Mapper
public interface CustomerMapper {

    public Integer lastId(Map<String, Object> params);
    
    public Customer getByLogin(LoginRequest request);
    
    public List<Customer> getAll(Map<String, Object> params);

    public Customer getById(Map<String, Object> params);

    public Customer getByPhone(Map<String, Object> params);

    public List<Address> getAddresses(Map<String, Object> params);

    public List<Point> getPoints(Map<String, Object> params);

    public void addTiming(String time);

    public void addCustomer(CustomerAddRequest customer);

    public void addAddress(AddressAddRequest address);

    public void changePoint(PointChangeRequest request);

    public void updateCustomer(Map<String, Object> params);

}
