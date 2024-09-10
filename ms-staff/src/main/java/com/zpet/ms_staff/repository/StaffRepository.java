package com.zpet.ms_staff.repository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_staff.mapper.StaffMapper;
import com.zpet.ms_staff.model.Staff;
import com.zpet.ms_staff.request.StaffAddRequest;

@Repository
public class StaffRepository {

    @Autowired
    StaffMapper staffMapper;
    
    public Integer maxId() {
    	return staffMapper.maxId();
    }

    public List<Staff> getAll(Map<String, Object> params) {
        return staffMapper.getAll(params);
    }

    public Staff getById(Map<String, Object> params){
        return staffMapper.getById(params);
    }

    public Staff getLogin(Map<String, Object> params){
        return staffMapper.getLogin(params);
    }
    
    public void addStaff(StaffAddRequest request) {
    	staffMapper.addStaff(request);
    }
    
    public void updateStaff(StaffAddRequest request) {
    	staffMapper.updateStaff(request);
    }

}
