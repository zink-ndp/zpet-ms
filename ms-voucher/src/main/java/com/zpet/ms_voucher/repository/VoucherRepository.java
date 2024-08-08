package com.zpet.ms_voucher.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_voucher.mapper.VoucherMapper;

@Repository
public class VoucherRepository {
    
    @Autowired VoucherMapper voucherMapper;

}
