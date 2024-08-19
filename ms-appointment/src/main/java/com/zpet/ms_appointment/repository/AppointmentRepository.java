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
    
    public Integer lastId() {
    	if (appointmentMapper.lastId() == null) return 0;
    	return appointmentMapper.lastId();
    }

    public List<Appointment> getAll(Map<String, Object> params){
        return appointmentMapper.getAll(params);
    }
    
    public void insertAtTime(String attime) {
    	appointmentMapper.insertAtTime(attime);
    }
    
    public void insertAppointment(Appointment request) {
    	appointmentMapper.insertAppointment(request);
    }
    
    public void insertServiceAppointment(Map<String, Object> params) {
    	appointmentMapper.insertServiceAppointment(params);
    }
    
    public void insertApmStatus(Map<String, Object> params) {
    	appointmentMapper.insertApmStatus(params);
    }

}
