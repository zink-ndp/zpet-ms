package com.zpet.ms_appointment.repository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_appointment.mapper.AppointmentMapper;
import com.zpet.ms_appointment.model.Appointment;

@Repository
public class AppointmentRepository {

    @Autowired
    AppointmentMapper appointmentMapper;

    public List<Appointment> getAll(Map<String, Object> params){
        return appointmentMapper.getAll(params);
    }

}
