package com.zpet.ms_invoice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.zpet.ms_invoice.service.InvoiceService;

@RestController
public class InvoiceController {
    
    @Autowired InvoiceService invoiceService;

}
