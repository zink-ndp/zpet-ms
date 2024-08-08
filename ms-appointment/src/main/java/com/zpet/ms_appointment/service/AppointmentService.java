package com.zpet.ms_appointment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zpet.ms_appointment.repository.AppointmentRepository;

@Service
public class AppointmentService {
    
    @Autowired AppointmentRepository appointmentRepository;

}
