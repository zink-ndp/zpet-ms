package com.zpet.ms_appointment.response;

import java.util.List;

public class AppointmentDetailResponse {

	private AppointmentResponse info;
	private List<AppointmentHistoryResponse> history;
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
