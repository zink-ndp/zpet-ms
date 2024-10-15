package com.zpet.ms_customer.request;

import lombok.Data;

@Data
public class PointChangeRequest {

    private String time;
    private String customerId;
    private Integer change;
    private Integer isEarn;
    private Integer total;

}
