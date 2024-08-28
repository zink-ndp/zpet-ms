package com.zpet.ms_invoice.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.zpet.ms_invoice.model.Invoice;
import com.zpet.ms_invoice.repository.InvoiceRepository;

@Service
public class InvoiceService {
    
    @Autowired InvoiceRepository invoiceRepository;
    
    public Map<String, Object> getInvoices(Map<String, Object> param){
    	List<Invoice> invoices =  invoiceRepository.getInvoices(param);
    	RestTemplate restTemplate = new RestTemplate();
    	Map<String, Object> customer = restTemplate.getForObject("http://localhost:8900/api/customer/byid?id=" + param.get("id"), Map.class);
    	Map<String, Object> response = new HashMap<>();
    	List<Map<String, Object>> address = new ArrayList<>();
    	invoices.forEach(i -> {    		
    		Map<String, Object> adr = restTemplate.getForObject("http://localhost:8900/api/customer/addresses?id="+param.get("id")+"&adrId="+i.getAddressId(), Map.class);
    		address.add(adr);
    	});
    	response.put("customer", customer);
    	response.put("invoices", invoices);
    	response.put("address", address);
    	return response;
    }

}
