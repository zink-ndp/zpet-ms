package com.zpet.frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;


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
    
    
    
}
