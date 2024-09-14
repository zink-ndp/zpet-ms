package com.zpet.ms_appointment.request;

import lombok.Data;

import java.util.List;

@Data
public class AddAppointmentRequest {
	
	private Integer id;
	private Integer customerId;
	private String date;
	private String time;
	private String note;
	private List<String> services;

}
