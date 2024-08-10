package com.zpet.ms_appointment.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zpet.ms_appointment.model.Appointment;
import com.zpet.ms_appointment.repository.AppointmentRepository;

@Service
public class AppointmentService {
    
    @Autowired AppointmentRepository appointmentRepository;

        public List<Appointment> getAll(Map<String, Object> params){
            return appointmentRepository.getAll(params);
        }

}
