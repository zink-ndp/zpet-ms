package com.zpet.ms_appointment.response;

import lombok.Data;

@Data
public class AppointmentResponse {
    
    private Integer id;
    private String date;
    private String time;
    private String note;
    private String customerName;
    private String status;

}
