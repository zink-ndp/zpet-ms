package com.zpet.ms_appointment.model;

import lombok.Data;

@Data
public class Appointment {
    
    private Integer id;
    private String date;
    private String time;
    private String note;
    private Integer customerId;
    private String status;

}
