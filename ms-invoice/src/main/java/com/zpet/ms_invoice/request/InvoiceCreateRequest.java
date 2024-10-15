package com.zpet.ms_invoice.request;

import lombok.Data;

import java.util.List;

@Data
public class InvoiceCreateRequest {

    private Integer id;
    private Integer total;
    private Integer customerId;
    private Integer staffId;
    private Integer addressId;
    private Integer voucherId;
    private Integer shipFeeId;
    private List<String> services;
    private Integer point;

}
