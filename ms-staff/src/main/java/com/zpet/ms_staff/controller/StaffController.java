package com.zpet.ms_staff.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.zpet.ms_staff.service.StaffService;

@RestController
public class StaffController {
    
    @Autowired StaffService staffService;

}
