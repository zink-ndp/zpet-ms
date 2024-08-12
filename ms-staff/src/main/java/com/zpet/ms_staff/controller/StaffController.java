package com.zpet.ms_staff.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.zpet.ms_staff.model.Staff;
import com.zpet.ms_staff.service.StaffService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class StaffController {
    
    @Autowired StaffService staffService;

    @GetMapping("/all")
    public List<Staff> getAll(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String phone,
        @RequestParam(required = false) String email,
        @RequestParam(required = false) Integer isManager,
        @RequestParam(required = false) Integer isWorking
    ) {
        Map<String, Object> params = new HashMap<String, Object>();
        if (name != null) params.put("name", "%"+name+"%");
        if (phone != null)params.put("phone", "%"+phone+"%");
        if (email != null)params.put("email", "%"+email+"%");
        if (isManager != null)params.put("isManager", isManager);
        if (isWorking != null)params.put("isWorking", isWorking);
        return staffService.getAll(params);
    }

    @GetMapping("/byid")
    public Staff getById(@RequestParam String id) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("id", id);
        return staffService.getById(params);
    }
    
    @GetMapping("/byphone")
    public Staff getByPhone(@RequestParam String phone) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("phone", phone);
        return staffService.getByPhone(params);
    }

}
