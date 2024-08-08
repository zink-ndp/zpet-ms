package com.zpet.ms_invoice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zpet.ms_invoice.repository.InvoiceRepository;

@Service
public class InvoiceService {
    
    @Autowired InvoiceRepository invoiceRepository;

}
