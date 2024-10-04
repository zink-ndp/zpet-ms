package com.zpet.ms_appointment.repository;

import java.util.List;
import java.util.Map;

import com.zpet.ms_appointment.response.CancelCountResponse;
import com.zpet.ms_appointment.response.DayCountResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_appointment.mapper.AppointmentMapper;
import com.zpet.ms_appointment.model.Appointment;
import com.zpet.ms_appointment.response.AppointmentHistoryResponse;

@Repository
public class AppointmentRepository {

    @Autowired
    AppointmentMapper appointmentMapper;

    public Integer lastId() {
        if (appointmentMapper.lastId() == null) return 0;
        return appointmentMapper.lastId();
    }

    public List<Appointment> getAll(Map<String, Object> params) {
        return appointmentMapper.getAll(params);
    }

    public List<DayCountResponse> getCountByDay(Map<String, Object> params) {
        return appointmentMapper.getCountByDay(params);
    }

    public List<AppointmentHistoryResponse> getAppointmentHistory(Integer id) {
        return appointmentMapper.getAppointmentHistory(id);
    }

    public List<String> getAppointmentServices(Integer id) {
        return appointmentMapper.getAppointmentServices(id);
    }

    public Integer getCancelCount(Integer customerId) {
        return appointmentMapper.getCancelCount(customerId);
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
