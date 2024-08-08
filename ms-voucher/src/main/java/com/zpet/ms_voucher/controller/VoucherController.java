package com.zpet.ms_voucher.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.zpet.ms_voucher.service.VoucherService;

@RestController
public class VoucherController {
    
    @Autowired VoucherService voucherService;

}
