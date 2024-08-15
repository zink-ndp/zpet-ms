package com.zpet.ms_service.model;

import lombok.Data;

@Data
public class Service {
    
    private Integer id;
    private String name;
    private String description;
    private Double price;
    private Integer isAvailable;

}
