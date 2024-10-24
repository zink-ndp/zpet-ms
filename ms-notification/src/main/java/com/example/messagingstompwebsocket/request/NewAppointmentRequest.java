package com.example.messagingstompwebsocket.request;

import lombok.Data;

@Data
public class NewAppointmentRequest {

    private String customerId;
    private String name;

}
