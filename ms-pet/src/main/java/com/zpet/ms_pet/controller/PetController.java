package com.zpet.ms_pet.controller;

import org.springframework.web.bind.annotation.RestController;

import com.zpet.ms_pet.model.Pet;
import com.zpet.ms_pet.model.PetHealth;
import com.zpet.ms_pet.request.PetImageUploadRequest;
import com.zpet.ms_pet.response.PetDetailResponse;
import com.zpet.ms_pet.response.PetResponse;
import com.zpet.ms_pet.service.PetService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;



@RestController
@RequestMapping("/api/pet")
public class PetController {

    @Autowired PetService petService;

    @GetMapping("/all")
    public List<PetResponse> getAll(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String specie,
        @RequestParam(required = false) Integer gender,
        @RequestParam(required = false) Integer type
    ) {
        Map<String, Object> params = new HashMap<String, Object>();
        if (name != null) params.put("name", "%"+name+"%");
        if (specie != null) params.put("specie", "%"+specie+"%");
        if (gender != null) params.put("gender", gender);
        if (type != null) params.put("type", type);
        return petService.getAll(params);
    }

    @GetMapping("/byid")
    public PetDetailResponse getDetailById(@RequestParam Integer id) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("id", id);
        return petService.getDetailById(params);
    }

    @GetMapping("/healths")
    public List<PetHealth> getHealths(@RequestParam Integer id) {
        return petService.getHealths(id);
    }
    
    @PostMapping("/create")
    public ResponseEntity<Object> createPet(@RequestBody Pet pet, @ModelAttribute PetImageUploadRequest imageUploadRequest){
        petService.create(pet, imageUploadRequest);
        return ResponseEntity.ok().build();
    }
    
        
    
}
