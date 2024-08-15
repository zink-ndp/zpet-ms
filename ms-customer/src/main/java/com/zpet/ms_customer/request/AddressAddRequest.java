package com.zpet.ms_customer.request;

import lombok.Data;

@Data
public class AddressAddRequest {
    
    private Integer addressId;
    private Integer customerId;
    private String receiverName;
    private String province;
    private String district;
    private String ward;
    private String note;
    private String lat;
    private String lng;
    private Double distance;

}
