package com.zpet.ms_customer.model;

import lombok.Data;

@Data
public class Address {
    
    private Integer id;
    private String receiverName;
    private String province;
    private String district;
    private String ward;
    private String note;
    private String lat;
    private String lng;
    private Double distance;
}
