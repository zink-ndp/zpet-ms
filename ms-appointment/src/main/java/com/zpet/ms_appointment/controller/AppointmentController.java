package com.zpet.ms_appointment.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.zpet.ms_appointment.model.Service;
import com.zpet.ms_appointment.request.AddAppointmentRequest;
import com.zpet.ms_appointment.request.AppointmentStatusUpdateRequest;
import com.zpet.ms_appointment.response.AppointmentDetailResponse;
import com.zpet.ms_appointment.response.AppointmentHistoryResponse;
import com.zpet.ms_appointment.response.AppointmentResponse;
import com.zpet.ms_appointment.service.AppointmentService;
import com.zpet.ms_appointment.utils.FunctionUtils;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

	@Autowired
	AppointmentService appointmentService;

	@Autowired
	FunctionUtils funcUtils;

	@GetMapping("/all")
	public List<AppointmentResponse> getAll(@RequestParam(required = false) String status,
			@RequestParam(required = false) Integer id, @RequestParam(required = false) String dateFilter,
			@RequestParam(required = false) Integer customerId,
			@RequestParam(required = false) Integer upcomingAppointment) {
		Map<String, Object> params = new HashMap<String, Object>();
		if (status != null) {			
			List<String> filterStatus = funcUtils.seperateString(status);
			List<String> otherStatus = new ArrayList<>();
			for (int i = Integer.parseInt(filterStatus.get(filterStatus.size()-1)); i < 5; i++) {
				if (!filterStatus.contains(String.valueOf(i))) otherStatus.add(String.valueOf(i));
			}
			params.put("filterStatus", filterStatus);
			params.put("otherStatus", otherStatus);
		}
		if (id != null)
			params.put("id", id);

		if (dateFilter != null && !dateFilter.isEmpty()) {
			params.put("dateFrom", funcUtils.convertStringToDate(dateFilter.split("_")[0]));
			params.put("dateTo", funcUtils.convertStringToDate(dateFilter.split("_")[1]));
		}
		if (customerId != null)
			params.put("customerId", customerId);
		if (upcomingAppointment != null)
			params.put("upcomingAppointment", upcomingAppointment);
		return appointmentService.getAll(params);
	}

	@GetMapping("/detail")
	public AppointmentDetailResponse getDetail(@RequestParam Integer id) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", id);
		AppointmentResponse info = appointmentService.getAll(params).get(0);
		if (info == null)
			return null;
		List<AppointmentHistoryResponse> history = appointmentService.getHistory(id);
		List<String> servicesId = appointmentService.getAppointmentServices(id);
		List<Service> services = new ArrayList<>();

		RestTemplate restTemplate = new RestTemplate();
		servicesId.forEach(sId -> {
			ParameterizedTypeReference<List<Service>> typeReference = new ParameterizedTypeReference<List<Service>>() {
			};
			ResponseEntity<List<Service>> responseEntity = restTemplate
					.exchange("http://localhost:8900/api/service/all?id=" + sId, HttpMethod.GET, null, typeReference);
			List<Service> servicesFetch = responseEntity.getBody();
			if (servicesFetch != null) {
				Service srv = servicesFetch.get(0);
				services.add(srv);
			}
		});

		AppointmentDetailResponse response = new AppointmentDetailResponse();
		response.setInfo(info);
		response.setHistory(history);
		response.setService(services);
		return response;
	}

	@PostMapping("/create")
	@Transactional
	public ResponseEntity<Object> create(@RequestBody AddAppointmentRequest request) {
		appointmentService.createAppointment(request);
		return ResponseEntity.ok().build();
	}

	@PostMapping("/updateStatus")
	@Transactional
	public ResponseEntity<Object> updateStatus(@RequestBody AppointmentStatusUpdateRequest request) {
		appointmentService.updateStatusAppointment(request);
		return ResponseEntity.ok().build();
	}

}
