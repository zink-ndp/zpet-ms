package com.zpet.ms_appointment.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zpet.ms_appointment.response.AppointmentResponse;
import com.zpet.ms_appointment.service.AppointmentService;

@RestController
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @GetMapping("/all")
    public List<AppointmentResponse> getAll(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Integer id,
            @RequestParam(required = false) Integer customerId) {
        Map<String, Object> params = new HashMap<String, Object>();
        if (status != null)
            params.put("status", status);
        if (id != null)
            params.put("id", id);
        if (customerId != null)
            params.put("customerId", customerId);
        return appointmentService.getAll(params);
    }

}
