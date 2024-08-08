package com.zpet.ms_voucher.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zpet.ms_voucher.repository.VoucherRepository;

@Service
public class VoucherService {
    
    @Autowired VoucherRepository voucherRepository;

}
