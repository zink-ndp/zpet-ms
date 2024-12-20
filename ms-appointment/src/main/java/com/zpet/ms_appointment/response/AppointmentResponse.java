package com.zpet.ms_appointment.response;

import lombok.Data;

@Data
public class AppointmentResponse {
    
    private Integer id;
    private String date;
    private String time;
    private String note;
    private String customerId;
    private String customerName;
    private String customerPhone;
	private String status;
	private Integer count;

}
