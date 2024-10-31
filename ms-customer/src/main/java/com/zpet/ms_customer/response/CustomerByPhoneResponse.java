package com.zpet.ms_customer.response;

import lombok.Data;

@Data
public class CustomerByPhoneResponse {

    private Integer id;
    private String name;
    private String phone;
    private String dateCreated;
    private Integer isActive;
    private Integer point;
    private Integer hasPassword;

}
