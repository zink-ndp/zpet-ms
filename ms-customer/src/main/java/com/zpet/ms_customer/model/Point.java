package com.zpet.ms_customer.model;

import lombok.Data;

@Data
public class Point {
    
    private String time;
    private Integer customerId;
    private Integer change;
    private Integer isEarn;
    private Integer total;

}
