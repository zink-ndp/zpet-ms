package com.zpet.ms_appointment.response;

import java.util.List;

import com.zpet.ms_appointment.model.Service;

public class AppointmentDetailResponse {

	private AppointmentResponse info;
	private List<AppointmentHistoryResponse> history;
	private List<Service> service;
	
	public List<Service> getService() {
		return service;
	}
	public void setService(List<Service> service) {
		this.service = service;
	}
	public AppointmentResponse getInfo() {
		return info;
	}
	public void setInfo(AppointmentResponse info) {
		this.info = info;
	}
	public List<AppointmentHistoryResponse> getHistory() {
		return history;
	}
	public void setHistory(List<AppointmentHistoryResponse> history) {
		this.history = history;
	}

	
	
	
	
}
