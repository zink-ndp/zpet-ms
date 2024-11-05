package com.zpet.ms_service.request;

import lombok.Data;

@Data
public class ServiceRateRequest {
    private Integer id;
    private String serviceId;
    private String star;
    private String comment;
    private String customerId;
    private String invoiceId;
}
