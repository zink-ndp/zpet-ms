package com.zpet.ms_pet.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class PetController {

    @GetMapping("/")
    public String getAll() {
        return "Hello Pet";
    }
    
    
}
