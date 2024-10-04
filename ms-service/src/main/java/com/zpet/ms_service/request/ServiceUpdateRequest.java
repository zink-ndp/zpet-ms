package com.zpet.ms_service.request;

import lombok.Data;

@Data
public class ServiceUpdateRequest {

    private Integer id;
    private String name;
    private String description;
    private Double price;
    private Integer isAvailable;

}
