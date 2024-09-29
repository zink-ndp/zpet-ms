package com.zpet.ms_appointment.request;

import lombok.Data;

@Data
public class AppointmentStatusUpdateRequest {
	
	private Integer status;
	private Integer apmId;
	private String description;

}
