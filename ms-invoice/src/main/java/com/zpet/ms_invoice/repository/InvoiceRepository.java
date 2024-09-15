package com.zpet.ms_invoice.repository;

import java.util.List;
import java.util.Map;

import com.zpet.ms_invoice.request.InvoiceCreateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_invoice.mapper.InvoiceMapper;
import com.zpet.ms_invoice.model.Invoice;

@Repository
public class InvoiceRepository {
    
    @Autowired InvoiceMapper invoiceMapper;

    public Integer maxId() {
        Integer maxId = invoiceMapper.maxId();
        return maxId == null ? 0 : maxId;
    }
    
    public List<Invoice> getInvoices (Map<String, Object> param){
    	return invoiceMapper.getInvoices(param);
    }

    public void create (InvoiceCreateRequest request) { invoiceMapper.create(request); }

    public void addServiceIncluded(Map<String, Object> param){ invoiceMapper.addServiceIncluded(param); }

}
