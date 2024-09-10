package com.zpet.ms_staff.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;

import com.zpet.ms_staff.model.Staff;
import com.zpet.ms_staff.request.LoginRequest;
import com.zpet.ms_staff.request.StaffAddRequest;
import com.zpet.ms_staff.service.StaffService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/staff")
public class StaffController {
    
    @Autowired StaffService staffService;

    @GetMapping("/all")
    public List<Staff> getAll(
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) Integer isManager,
        @RequestParam(required = false) Integer isWorking
    ) {
        Map<String, Object> params = new HashMap<String, Object>();
        if (keyword != null) params.put("keyword", "%"+keyword+"%");
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
    
    @PostMapping("/login")
    public Staff getByPhone(@RequestBody LoginRequest request) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("phone", request.getPhone());
        params.put("password", request.getPassword());
        params.put("role", request.getRole());
        return staffService.getByPhone(params);
    }
    
    @PostMapping("/add")
    @Transactional
    public ResponseEntity<Object> addStaff(@RequestBody StaffAddRequest request) {
        staffService.addStaff(request);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/update")
    public ResponseEntity<Object> updateStaff(@RequestBody StaffAddRequest request) {
        staffService.updateStaff(request);
        return ResponseEntity.ok().build();
    }
    
    

}
