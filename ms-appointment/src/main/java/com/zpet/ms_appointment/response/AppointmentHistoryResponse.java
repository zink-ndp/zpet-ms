package com.zpet.ms_appointment.response;

public class AppointmentHistoryResponse {
	
	private String attime;
	private Integer apmId;
	private String description;
	private String status;
	public String getAttime() {
		return attime;
	}
	public void setAttime(String attime) {
		this.attime = attime;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	

}
