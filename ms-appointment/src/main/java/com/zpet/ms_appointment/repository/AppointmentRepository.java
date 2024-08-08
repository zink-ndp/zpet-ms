package com.zpet.ms_appointment.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_appointment.mapper.AppointmentMapper;

@Repository
public class AppointmentRepository {
    
    @Autowired AppointmentMapper appointmentMapper;

}
