package com.zpet.ms_appointment.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zpet.ms_appointment.response.DayCountResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.zpet.ms_appointment.model.Appointment;
import com.zpet.ms_appointment.model.Customer;
import com.zpet.ms_appointment.repository.AppointmentRepository;
import com.zpet.ms_appointment.request.AddAppointmentRequest;
import com.zpet.ms_appointment.request.AppointmentStatusUpdateRequest;
import com.zpet.ms_appointment.response.AppointmentHistoryResponse;
import com.zpet.ms_appointment.response.AppointmentResponse;
import com.zpet.ms_appointment.utils.FunctionUtils;

@Service
public class AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;
    
    @Autowired
    FunctionUtils funcUtils;

    public List<AppointmentResponse> getAll(Map<String, Object> params) {
        List<Appointment> appointments = appointmentRepository.getAll(params);
        List<AppointmentResponse> responseList = new ArrayList<>();
        appointments.forEach(a -> {
            AppointmentResponse response = new AppointmentResponse();
            BeanUtils.copyProperties(a, response);
            Integer customerId = a.getCustomerId();
            RestTemplate restTemplate = new RestTemplate();
            if (customerId != null) {
                Customer customer = restTemplate.getForObject("http://localhost:8900/api/customer/byid?id=" + customerId, Customer.class);
                if (customer != null) {
                    response.setCustomerId(customer.getId().toString());
                    response.setCustomerName(customer.getName());
                    response.setCustomerPhone(customer.getPhone());
                }
            } else {
                response.setCustomerName("Khách vãng lai");
                response.setCustomerPhone(funcUtils.extractPhoneNumber(a.getNote()));
            }
            response.setDate(funcUtils.formatDateTimeFromQuery(response.getDate(), "dd/MM/yyyy"));
            response.setCount(appointmentRepository.getCancelCount(customerId));
            responseList.add(response);
        });
        return responseList;
    }

    public List<DayCountResponse> getCountByDay(Map<String, Object> params){
        return appointmentRepository.getCountByDay(params);
    }
    
    public List<AppointmentHistoryResponse> getHistory(Integer id) {
    	return appointmentRepository.getAppointmentHistory(id);
    }
    
    public List<String> getAppointmentServices(Integer id){
    	return appointmentRepository.getAppointmentServices(id);
    }
    
    
    public Integer createAppointment(AddAppointmentRequest request){
    	Appointment apm = new Appointment();
    	BeanUtils.copyProperties(request, apm);
    	Integer nextId = appointmentRepository.lastId() + 1;
    	apm.setId(nextId);
    	apm.setDate(funcUtils.convertStringToDate(apm.getDate()).toString());
    	appointmentRepository.insertAppointment(apm);
    	request.getServices().forEach(srv -> {
    		Map<String, Object> params = new HashMap<>();
    		params.put("apmId", nextId);
    		params.put("srvId", srv);
    		appointmentRepository.insertServiceAppointment(params);
    	});
    	LocalDateTime now = LocalDateTime.now();
    	appointmentRepository.insertAtTime(now.toString());
    	Map<String, Object> paramsApmStt = new HashMap<>();
    	paramsApmStt.put("status", 0);
    	paramsApmStt.put("atTime", now);
    	paramsApmStt.put("apmId", nextId);
    	paramsApmStt.put("description", "Khởi tạo lịch hẹn");
    	appointmentRepository.insertApmStatus(paramsApmStt);
        return nextId;
    }
    
    public void updateStatusAppointment(AppointmentStatusUpdateRequest request) {
    	LocalDateTime now = LocalDateTime.now();
    	appointmentRepository.insertAtTime(now.toString());
    	Map<String, Object> paramsApmStt = new HashMap<>();
    	paramsApmStt.put("status", request.getStatus());
    	paramsApmStt.put("atTime", now);
    	paramsApmStt.put("apmId", request.getApmId());
    	paramsApmStt.put("description", request.getDescription());
    	appointmentRepository.insertApmStatus(paramsApmStt);
    }

}
