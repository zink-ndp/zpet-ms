package com.zpet.ms_staff.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_staff.mapper.StaffMapper;

@Repository
public class StaffRepository {
    
    @Autowired StaffMapper staffMapper;

}
