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

    @Autowired
    InvoiceMapper invoiceMapper;

    public Integer maxId() {
        Integer maxId = invoiceMapper.maxId();
        return maxId == null ? 0 : maxId;
    }

    public List<Invoice> getAll(Map<String, Object> param) {
        return invoiceMapper.getAll(param);
    }

    public Invoice getInvoiceById(Map<String, Object> param) {
        return invoiceMapper.getInvoiceById(param);
    }

    public List<Map<String, Object>> getServiceIncluded(String invoiceId) {
        return invoiceMapper.getServiceIncluded(invoiceId);
    }

    public void create(InvoiceCreateRequest request) {
        invoiceMapper.create(request);
    }

    public void addServiceIncluded(Map<String, Object> param) {
        invoiceMapper.addServiceIncluded(param);
    }

    public void updateInclude(Map<String, Object> param) {
        invoiceMapper.updateInclude(param);
    }

}
