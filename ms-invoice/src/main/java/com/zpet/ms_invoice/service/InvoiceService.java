package com.zpet.ms_invoice.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import com.zpet.ms_invoice.request.InvoiceCreateRequest;
import com.zpet.ms_invoice.request.PointChangeRequest;
import com.zpet.ms_invoice.util.FunctionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.zpet.ms_invoice.model.Invoice;
import com.zpet.ms_invoice.repository.InvoiceRepository;

@Service
public class InvoiceService {
    
    @Autowired InvoiceRepository invoiceRepository;
	@Autowired FunctionUtils funcUtils;

	public List<Invoice> getAll (Map<String, Object> param){
		List<Invoice> invoices = invoiceRepository.getAll(param);
		invoices.forEach(i -> {
			i.setCreateTime(funcUtils.formatDate(i.getCreateTime(),"dd/MM/yyyy"));
		});
		return invoices;
	}

    public Map<String, Object> getInvoiceById(Map<String, Object> param){
    	Invoice invoice =  invoiceRepository.getInvoiceById(param);
		invoice.setCreateTime(funcUtils.formatDate(invoice.getCreateTime(),"dd/MM/yyyy hh:mm"));
    	RestTemplate restTemplate = new RestTemplate();
    	Map<String, Object> customer = restTemplate.getForObject("http://localhost:8900/api/customer/byid?id=" + invoice.getCustomerId(), Map.class);
		List<String> serviceIds = invoiceRepository.getServiceIncluded(invoice.getId().toString());
		List<Object> services = new ArrayList<>();
		serviceIds.forEach(srvId -> {
			List<Object> service = restTemplate.getForObject("http://localhost:8900/api/service/all?id=" + srvId, List.class);
            assert service != null;
            services.add(service.get(0));
		});
    	Map<String, Object> response = new HashMap<>();
    	response.put("invoice", invoice);
    	response.put("customer", customer);
		response.put("services", services);
    	return response;
    }

	public Integer create (InvoiceCreateRequest request) {

		Integer pointUse = request.getPoint();

		Integer nextId = invoiceRepository.maxId() + 1;
		request.setId(nextId);
		invoiceRepository.create(request);
		request.getServices().forEach(s -> {
			Map<String, Object> param = new HashMap<>();
			param.put("invId", nextId);
			param.put("srvId", s);
			invoiceRepository.addServiceIncluded(param);
		});

		PointChangeRequest pointChangeRequest = new PointChangeRequest();
		pointChangeRequest.setTotal(0);
		pointChangeRequest.setCustomerId(request.getCustomerId().toString());
		pointChangeRequest.setIsEarn(1);
		pointChangeRequest.setChange((int) (request.getTotal()*0.001));
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<Object> callAPIAddPoint = restTemplate.postForEntity("http://localhost:8900/api/customer/updatePoint", pointChangeRequest, Object.class);
		Object addP = callAPIAddPoint.getBody();

		ScheduledExecutorService ex = Executors.newSingleThreadScheduledExecutor();
		ex.schedule(() -> {
			if (pointUse != null) {
				pointChangeRequest.setTotal(0);
				pointChangeRequest.setCustomerId(request.getCustomerId().toString());
				pointChangeRequest.setIsEarn(0);
				pointChangeRequest.setChange(pointUse);
				ResponseEntity<Object> callAPIUpdatePoint = restTemplate.postForEntity("http://localhost:8900/api/customer/updatePoint", pointChangeRequest, Object.class);
				Object updP = callAPIUpdatePoint.getBody();
			}
		}, 1, TimeUnit.SECONDS);


		return nextId;

	}

}
