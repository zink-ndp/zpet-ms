package com.zpet.ms_appointment.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.zpet.ms_appointment.model.Appointment;
import com.zpet.ms_appointment.response.AppointmentHistoryResponse;

@Mapper
public interface AppointmentMapper {

    public Integer lastId();

    public List<Appointment> getAll(Map<String, Object> params);
    
    public List<AppointmentHistoryResponse> getAppointmentHistory(Integer id);
    
    public void insertAtTime(String attime);
    
    public void insertAppointment(Appointment request);
    
    public void insertServiceAppointment(Map<String, Object> params);
    
    public void insertApmStatus(Map<String, Object> params);
    
}
