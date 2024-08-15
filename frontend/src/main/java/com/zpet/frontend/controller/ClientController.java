package com.zpet.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
public class ClientController {
    
    @GetMapping("/")
    public String homeView() {
        return "client/index";
    }

    @GetMapping("/appointments")
    public String appointmentView() {
        return "client/appointments";
    }

    @GetMapping("/invoices")
    public String invoiceView() {
        return "client/invoices";
    }

    @GetMapping("/pets")
    public String petView() {
        return "client/pets";
    }

    @GetMapping("/service-detail")
    public String servicedetailView(@RequestParam Integer id) {
        return "client/service-detail";
    }
    
    @GetMapping("/vouchers")
    public String voucherView() {
        return "client/vouchers";
    }

}
