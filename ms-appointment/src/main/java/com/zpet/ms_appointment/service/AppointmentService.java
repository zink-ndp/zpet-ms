package com.zpet.ms_appointment.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.zpet.ms_appointment.model.Appointment;
import com.zpet.ms_appointment.model.Customer;
import com.zpet.ms_appointment.repository.AppointmentRepository;
import com.zpet.ms_appointment.response.AppointmentResponse;

@Service
public class AppointmentService {

    @Autowired
    AppointmentRepository appointmentRepository;

    public List<AppointmentResponse> getAll(Map<String, Object> params) {
        List<Appointment> appointments = appointmentRepository.getAll(params);
        List<AppointmentResponse> responseList = new ArrayList<>();
        appointments.stream().forEach(a -> {
            AppointmentResponse response = new AppointmentResponse();
            BeanUtils.copyProperties(a, response);
            Integer customerId = a.getCustomerId();
            RestTemplate restTemplate = new RestTemplate();
            Customer customer = restTemplate.getForObject("http:localhost:8904/byid?id=" + customerId, Customer.class);
            if (customer != null) {
                response.setCustomerName(customer.getName());
            } 
            responseList.add(response);
        });
        return responseList;
    }

}
