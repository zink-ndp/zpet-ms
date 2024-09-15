package com.zpet.ms_invoice.controller;

import java.util.HashMap;
import java.util.Map;

import com.zpet.ms_invoice.request.InvoiceCreateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/create")
    @Transactional
    public ResponseEntity<Object> create(@RequestBody InvoiceCreateRequest request) {
        invoiceService.create(request);
        return ResponseEntity.ok().build();
    }
    
}
