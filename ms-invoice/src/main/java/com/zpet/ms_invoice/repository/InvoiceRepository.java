package com.zpet.ms_invoice.repository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_invoice.mapper.InvoiceMapper;
import com.zpet.ms_invoice.model.Invoice;

@Repository
public class InvoiceRepository {
    
    @Autowired InvoiceMapper invoiceMapper;
    
    public List<Invoice> getInvoices (Map<String, Object> param){
    	return invoiceMapper.getInvoices(param);
    }

}
