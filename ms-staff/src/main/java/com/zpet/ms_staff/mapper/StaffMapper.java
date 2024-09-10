package com.zpet.ms_staff.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.zpet.ms_staff.model.Staff;
import com.zpet.ms_staff.request.StaffAddRequest;

@Mapper
public interface StaffMapper {
	
	public Integer maxId();

    public List<Staff> getAll(Map<String, Object> params);

    public Staff getById(Map<String, Object> params);

    public Staff getLogin(Map<String, Object> params);
    
    public void addStaff(StaffAddRequest request);
    
    public void updateStaff(StaffAddRequest request);

}
