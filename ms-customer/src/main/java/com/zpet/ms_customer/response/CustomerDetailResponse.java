package com.zpet.ms_customer.response;

import java.util.List;

import com.zpet.ms_customer.model.Address;
import com.zpet.ms_customer.model.Point;
import lombok.Data;

@Data
public class CustomerDetailResponse {

	private Integer id;
    private String name;
    private String phone;
    private String dateCreated;
    private Integer isActive;
    private List<Point> points;
    private List<Address> addresses;
	
}
