package com.zpet.ms_appointment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.zpet.ms_appointment.service.AppointmentService;

@RestController
public class AppointmentController {
    
    @Autowired AppointmentService appointmentService;

}
