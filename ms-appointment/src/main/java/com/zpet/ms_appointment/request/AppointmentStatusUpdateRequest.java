package com.zpet.ms_appointment.request;

public class AppointmentStatusUpdateRequest {
	
	private Integer status;
	private Integer apmId;
	private String description;
	
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getApmId() {
		return apmId;
	}
	public void setApmId(Integer apmId) {
		this.apmId = apmId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	

}
