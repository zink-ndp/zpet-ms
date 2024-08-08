package com.zpet.ms_pet.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_pet.mapper.PetMapper;

@Repository
public class PetRepository {
    
    @Autowired PetMapper petMapper;

}
