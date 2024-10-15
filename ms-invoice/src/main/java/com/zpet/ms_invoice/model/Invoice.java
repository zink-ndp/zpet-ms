package com.zpet.ms_invoice.model;

import lombok.Data;

@Data
public class Invoice {
	private Integer id;
	private Integer shippingId;
	private Integer staffId;
	private Integer customerId;
	private Integer addressId;
	private Integer voucherId;
	private Double total;
	private String createTime;
	private Integer point;
}