package com.zpet.user_mservice.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class UserController {
    
    @GetMapping("/")
    public String hello() {
        return "Hello, world!";
    }
    

}
