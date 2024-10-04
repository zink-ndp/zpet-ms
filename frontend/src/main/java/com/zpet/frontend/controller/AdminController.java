package com.zpet.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/")
    public String adminView() {
        return "admin/index";
    }

    @GetMapping("/login")
    public String loginView() {
        return "admin/login";
    }

    @GetMapping("/logout")
    public String logoutView() {
        return "admin/logout";
    }

    @GetMapping("/appointment")
    public String appointmentView() {
        return "admin/appointment";
    }
    
    @GetMapping("/staff")
    public String staffView() {
        return "admin/staff";
    }
    
    @GetMapping("/customer")
    public String customerView() {
        return "admin/customer";
    }
    
    @GetMapping("/pet")
    public String petView() {
        return "admin/pet";
    }

    @GetMapping("/invoice")
    public String invoiceView() {
        return "admin/invoice";
    }

    @GetMapping("/invoice-create")
    public String invoiceCreateView() {
        return "admin/invoice-create";
    }
    
    @GetMapping("/service")
    public String serviceView() {
        return "admin/service";
    }

    @GetMapping("/voucher")
    public String voucherView() {
        return "admin/voucher";
    }
    
}
