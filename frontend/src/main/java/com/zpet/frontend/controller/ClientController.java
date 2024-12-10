package com.zpet.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;




@Controller
public class ClientController {

    @GetMapping("/404")
    public String page404View() {
        return "404";
    }
    
    @GetMapping("/login")
    public String loginView() {
        return "client/login";
    }

    @GetMapping("/logout")
    public String logoutView() {
        return "client/logout";
    }
    
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

    @GetMapping("/services")
    public String allServiceView() {
        return "client/service-all";
    }
    

    @GetMapping("/service-detail/{id}")
    public String servicedetailView(@PathVariable Integer id, Model model) {
    	model.addAttribute("srvId", id);
        return "client/service-detail";
    }
    
    @GetMapping("/vouchers")
    public String voucherView() {
        return "client/vouchers";
    }

}
