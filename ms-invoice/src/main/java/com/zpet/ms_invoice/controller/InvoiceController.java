package com.zpet.ms_invoice.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.zpet.ms_invoice.model.Invoice;
import com.zpet.ms_invoice.request.InvoiceCreateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.zpet.ms_invoice.service.InvoiceService;

@RestController
@RequestMapping("/api/invoice")
public class InvoiceController {

    @Autowired
    InvoiceService invoiceService;

    @GetMapping("/")
    public List<Invoice> getAll(
            @RequestParam(required = false) String dateFilter,
            @RequestParam(required = false) Integer customerId
    ) {
        Map<String, Object> param = new HashMap<>();
        if (customerId != null) {
            param.put("customerId", customerId);
        }
        if (dateFilter != null) {
            param.put("dateFrom", dateFilter.split("_")[0]);
            param.put("dateTo", dateFilter.split("_")[1]);
        }
        return invoiceService.getAll(param);
    }

    @GetMapping("/byid")
    public Map<String, Object> getById(
            @RequestParam String id
    ) {
        Map<String, Object> param = new HashMap<>();
        param.put("id", id);
        return invoiceService.getInvoiceById(param);
    }

    @PostMapping("/create")
    @Transactional
    public ResponseEntity<Object> create(@RequestBody InvoiceCreateRequest request)  {
        Integer id = invoiceService.create(request);
        return ResponseEntity.ok(id);
    }

}
