package com.zpet.ms_invoice.mapper;

import java.util.List;
import java.util.Map;

import com.zpet.ms_invoice.request.InvoiceCreateRequest;
import org.apache.ibatis.annotations.Mapper;

import com.zpet.ms_invoice.model.Invoice;

@Mapper
public interface InvoiceMapper {

	public Integer maxId ();

	public List<Invoice> getAll (Map<String, Object> param);
    
	public Invoice getInvoiceById (Map<String, Object> param);

	public List<String> getServiceIncluded(String invoiceId);

	public void create (InvoiceCreateRequest request);

	public void addServiceIncluded(Map<String, Object> param);

}
