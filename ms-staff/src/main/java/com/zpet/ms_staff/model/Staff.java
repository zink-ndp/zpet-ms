package com.zpet.ms_staff.model;

import lombok.Data;

@Data
public class Staff {
    
    private Integer id;
    private String name;
    private String phone;
    private String email;
    private Integer isManager;
    private String joinedDate;
    private Integer isWorking;

}
