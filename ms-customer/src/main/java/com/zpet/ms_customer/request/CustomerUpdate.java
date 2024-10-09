package com.zpet.ms_customer.request;

import lombok.Data;

@Data
public class CustomerUpdate {

    private String id;
    private String name;
    private String phone;
    private String isWorking;

}
