package com.zpet.ms_customer.model;

import lombok.Data;

@Data
public class Invoice {
	private Integer id;
	private Integer shippingId;
	private Integer staffId;
	private Integer petId;
	private Integer customerId;
	private Integer addressId;
	private Integer voucherId;
	private Double total;
	private String createTime;
}