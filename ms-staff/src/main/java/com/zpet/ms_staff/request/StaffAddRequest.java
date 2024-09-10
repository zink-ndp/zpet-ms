package com.zpet.ms_staff.request;

public class StaffAddRequest {

	private Integer id;
	private String name;
	private String phone;
	private String email;
	private String password;
	private Integer	isManager;
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
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Integer getIsManager() {
		return isManager;
	}
	public void setIsManager(Integer isManager) {
		this.isManager = isManager;
	}
	public Integer getIsWorking() {
		return isWorking;
	}
	public void setIsWorking(Integer isWorking) {
		this.isWorking = isWorking;
	}
	
	
	
}
