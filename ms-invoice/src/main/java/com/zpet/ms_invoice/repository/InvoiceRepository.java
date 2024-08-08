package com.zpet.ms_invoice.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_invoice.mapper.InvoiceMapper;

@Repository
public class InvoiceRepository {
    
    @Autowired InvoiceMapper invoiceMapper;

}
