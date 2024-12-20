package com.zpet.ms_staff.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zpet.ms_staff.model.Staff;
import com.zpet.ms_staff.repository.StaffRepository;
import com.zpet.ms_staff.request.StaffAddRequest;
import com.zpet.ms_staff.util.FunctionUtils;

@Service
public class StaffService {
    
    @Autowired StaffRepository staffRepository;

    @Autowired FunctionUtils functionUtils;

    public List<Staff> getAll(Map<String, Object> params) {
        List<Staff> staffs = staffRepository.getAll(params);
        staffs.forEach(s -> {
            s.setJoinedDate(functionUtils.formatDate(s.getJoinedDate(), "dd/MM/yyyy"));
        });
        return staffs;
    }

    public Staff getById(Map<String, Object> params){
        Staff s = staffRepository.getById(params);
        s.setJoinedDate(functionUtils.formatDate(s.getJoinedDate(), "dd/MM/yyyy"));
        return s;
    }

    public Staff getByPhone(Map<String, Object> params){
        Staff s = staffRepository.getLogin(params);
        if (s == null) return null;
        s.setJoinedDate(functionUtils.formatDate(s.getJoinedDate(), "dd/MM/yyyy"));
        return s;
    }
    
    public void addStaff(StaffAddRequest request) {
    	Integer nextId = staffRepository.maxId()+1;
    	request.setId(nextId);
    	staffRepository.addStaff(request);
    }
    
    public void updateStaff(StaffAddRequest request) {
    	staffRepository.updateStaff(request);
    }

}
