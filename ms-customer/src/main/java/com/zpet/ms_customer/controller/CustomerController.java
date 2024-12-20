package com.zpet.ms_customer.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zpet.ms_customer.request.PointChangeRequest;
import com.zpet.ms_customer.response.CustomerByPhoneResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.zpet.ms_customer.model.Address;
import com.zpet.ms_customer.model.Customer;
import com.zpet.ms_customer.model.Point;
import com.zpet.ms_customer.request.AddressAddRequest;
import com.zpet.ms_customer.request.CustomerAddRequest;
import com.zpet.ms_customer.request.LoginRequest;
import com.zpet.ms_customer.response.CustomerDetailResponse;
import com.zpet.ms_customer.service.CustomerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

	@Autowired
	CustomerService customerService;

	@GetMapping("/all")
	public List<Customer> getAll(@RequestParam(required = false) String keyword) {
		Map<String, Object> params = new HashMap<>();
		if (keyword != null) {
			params.put("keyword", "%" + keyword + "%");
		}
		return customerService.getAll(params);
	}

	@GetMapping("/byid")
	public CustomerDetailResponse getById(@RequestParam String id) {
		CustomerDetailResponse response = new CustomerDetailResponse();
		Map<String, Object> params = new HashMap<>();
		params.put("id", id);
		Customer customer = customerService.getById(params);
		List<Point> points = customerService.getPoints(params);
		List<Address> addresses = customerService.getAddresses(params);
		BeanUtils.copyProperties(customer, response);
		response.setPoints(points != null ? points : new ArrayList<>());
		response.setAddresses(addresses != null ? addresses : new ArrayList<>());
		return response;
	}

	@PostMapping("/login")
	public Customer getUserLogin(@RequestBody LoginRequest request) {
		return customerService.getByLogin(request);
	}

	@GetMapping("/byphone")
	public CustomerByPhoneResponse getByPhone(@RequestParam String phone) {
		Map<String, Object> params = new HashMap<>();
		params.put("phone", phone);
        Customer customer = customerService.getByPhone(params);
		if (customer==null) {
			return null;
		}
		CustomerByPhoneResponse response = new CustomerByPhoneResponse();
		BeanUtils.copyProperties(customer, response);
		params.put("id", customer.getId());
		List<Point> points = customerService.getPoints(params);
		response.setPoint(points != null ? points.get(0).getTotal() : 0);
		return response;
    }

	@GetMapping("/addresses")
	public List<Address> getAddresses(@RequestParam String id, @RequestParam(required = false) String adrId) {
		Map<String, Object> params = new HashMap<>();
		params.put("id", id);
		if (adrId != null)
			params.put("adrId", adrId);
		return customerService.getAddresses(params);
	}

	@GetMapping("/points")
	public List<Point> getPoints(@RequestParam String id) {
		Map<String, Object> params = new HashMap<>();
		params.put("id", id);
		return customerService.getPoints(params);
	}

	@PostMapping("/add")
	public ResponseEntity<Object> addCustomer(@RequestBody CustomerAddRequest customer) {
		Integer lastId = customerService.add(customer);
		return ResponseEntity.ok(lastId);
	}

	@PostMapping("/addAddress")
	public ResponseEntity<Object> addAdress(@RequestBody AddressAddRequest address) {
		customerService.addAddress(address);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/updatePoint")
	public ResponseEntity<Object> updatePoint(@RequestBody PointChangeRequest request) {
		customerService.updatePoint(request);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/update")
	public ResponseEntity<Object> updateCustomer(
			@RequestParam String id,
			@RequestParam(required = false) String name,
			@RequestParam(required = false) String phone,
			@RequestParam(required = false) String password,
			@RequestParam(required = false) String isActive) {
		Map<String, Object> params = new HashMap<>();
		params.put("id", id);
		if (name != null)
			params.put("name", name);
		if (phone != null)
			params.put("phone", phone);
		if (password != null)
			params.put("password", password);
		if (isActive != null)
			params.put("isActive", isActive);
		customerService.update(params);
		return ResponseEntity.ok().build();
	}

}
