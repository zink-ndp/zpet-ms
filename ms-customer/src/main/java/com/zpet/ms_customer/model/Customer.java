package com.zpet.ms_customer.model;

import lombok.Data;

@Data
public class Customer {
    
    private Integer id;
    private String name;
    private String phone;
    private String dateCreated;
    private Integer isActive;

}
