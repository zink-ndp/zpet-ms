package com.zpet.ms_invoice.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.zpet.ms_invoice.service.InvoiceService;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {
    
    @Autowired InvoiceService invoiceService;

    @GetMapping("/")
    public Map<String, Object> getAll(@RequestParam String id) {
    	Map<String, Object> param = new HashMap<>();
    	param.put("id", id);
        return invoiceService.getInvoices(param);
    }
    
    
}
