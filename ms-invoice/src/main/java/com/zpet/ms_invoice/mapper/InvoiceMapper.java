package com.zpet.ms_invoice.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.zpet.ms_invoice.model.Invoice;

@Mapper
public interface InvoiceMapper {
    
	public List<Invoice> getInvoices (Map<String, Object> param);
	
}
