package com.zpet.ms_staff.model;

public class Staff {
    
    private Integer id;
    private String name;
    private String phone;
    private String email;
    private Integer isManager;
    private String joinedDate;
    private Integer isWorking;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Integer getIsManager() {
		return isManager;
	}
	public void setIsManager(Integer isManager) {
		this.isManager = isManager;
	}
	public String getJoinedDate() {
		return joinedDate;
	}
	public void setJoinedDate(String joinedDate) {
		this.joinedDate = joinedDate;
	}
	public Integer getIsWorking() {
		return isWorking;
	}
	public void setIsWorking(Integer isWorking) {
		this.isWorking = isWorking;
	}

    
    
}
