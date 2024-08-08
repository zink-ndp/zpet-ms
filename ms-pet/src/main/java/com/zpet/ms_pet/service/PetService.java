package com.zpet.ms_pet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zpet.ms_pet.repository.PetRepository;

@Service
public class PetService {
    
    @Autowired PetRepository petRepository;

}
