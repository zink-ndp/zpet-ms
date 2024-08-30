package com.zpet.ms_staff.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.zpet.ms_staff.model.Staff;

@Mapper
public interface StaffMapper {

    public List<Staff> getAll(Map<String, Object> params);

    public Staff getById(Map<String, Object> params);

    public Staff getLogin(Map<String, Object> params);

}
