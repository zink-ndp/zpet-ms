package com.zpet.ms_pet.controller;

import com.zpet.ms_pet.repository.PetRepository;
import com.zpet.ms_pet.request.ImageUploadRequest;
import com.zpet.ms_pet.request.PetCreateRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import com.zpet.ms_pet.model.Pet;
import com.zpet.ms_pet.model.PetHealth;
import com.zpet.ms_pet.response.PetDetailResponse;
import com.zpet.ms_pet.response.PetResponse;
import com.zpet.ms_pet.service.PetService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;


@Slf4j
@RestController
@RequestMapping("/api/pet")
public class PetController {

    @Autowired
    private PetService petService;

    @GetMapping("/all")
    public List<PetResponse> getAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String specie,
            @RequestParam(required = false) Integer gender,
            @RequestParam(required = false) Integer type,
            @RequestParam(required = false) Integer customerId
    ) {
        Map<String, Object> params = new HashMap<String, Object>();
        if (name != null) params.put("name", "%" + name + "%");
        if (specie != null) params.put("specie", "%" + specie + "%");
        if (gender != null) params.put("gender", gender);
        if (type != null) params.put("type", type);
        if (customerId != null) params.put("customerId", customerId);
        return petService.getAll(params);
    }

    @GetMapping("/byid")
    public ResponseEntity<Object> getDetailById(@RequestParam Integer id) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("id", id);
        PetDetailResponse petDetailResponse = petService.getDetailById(params);
        if (petDetailResponse == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(petDetailResponse);
    }

    @GetMapping("/healths")
    public List<PetHealth> getHealths(@RequestParam Integer id) {
        return petService.getHealths(id);
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createPet(@RequestBody Pet pet) {
        petService.create(pet);
        return ResponseEntity.ok(pet);
    }

    @PostMapping("/update-health")
    public ResponseEntity<Object> updateHealth(@RequestBody PetHealth petHealth) {
        PetHealth res = petService.updateHealth(petHealth);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/uploadImages")
    public void uploadImage(@ModelAttribute ImageUploadRequest request) throws Exception {
        petService.uploadImage(request);
    }

}
