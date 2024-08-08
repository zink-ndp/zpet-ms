package com.zpet.ms_staff.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zpet.ms_staff.repository.StaffRepository;

@Service
public class StaffService {
    
    @Autowired StaffRepository staffRepository;

}
