package com.zpet.ms_pet.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.zpet.ms_pet.model.Customer;
import com.zpet.ms_pet.model.Pet;
import com.zpet.ms_pet.model.PetHealth;
import com.zpet.ms_pet.repository.PetRepository;
import com.zpet.ms_pet.request.PetImageUploadRequest;
import com.zpet.ms_pet.response.PetDetailResponse;
import com.zpet.ms_pet.response.PetResponse;
import com.zpet.ms_pet.util.FunctionUtils;

@Service
public class PetService {

    @Autowired
    PetRepository petRepository;

    @Autowired
    FunctionUtils functionUtils;

    public List<PetResponse> getAll(Map<String, Object> param) {
        List<Pet> pets = petRepository.getAll(param);
        List<PetResponse> responses = new ArrayList<>();

        for (Pet p : pets) {
            PetResponse petResponse = new PetResponse();
            BeanUtils.copyProperties(p, petResponse);
            petResponse.setGender(p.getGender() == 1 ? "Đực" : "Cái");
            petResponse.setType(p.getTypeId() == 1 ? "Chó" : "Mèo");
            petResponse.setBirthday(functionUtils.formatDate(p.getBirthday(), "dd/MM/yyyy"));
            Integer customerId = p.getCustomerId();
            RestTemplate restTemplate = new RestTemplate();
            Customer customer = restTemplate
                                    .getForObject(
                                        "http://localhost:8904/byid?id=" + customerId,
                                        Customer.class);
            petResponse.setCustomerName(customer.getName());
            responses.add(petResponse);
        }

        return responses;
    }

    public PetDetailResponse getDetailById(Map<String, Object> param) {
        List<Pet> pets = petRepository.getAll(param);
        List<PetDetailResponse> responses = new ArrayList<>();
        for (Pet p : pets) {
            PetDetailResponse petResponse = new PetDetailResponse();
            BeanUtils.copyProperties(p, petResponse);
            petResponse.setGender(p.getGender() == 1 ? "Đực" : "Cái");
            petResponse.setType(p.getTypeId() == 1 ? "Chó" : "Mèo");
            petResponse.setBirthday(functionUtils.formatDate(p.getBirthday(), "dd/MM/yyyy"));
            Integer customerId = p.getCustomerId();
            RestTemplate restTemplate = new RestTemplate();
            Customer customer = restTemplate
                                    .getForObject(
                                        "http://localhost:8904/byid?id=" + customerId,
                                        Customer.class);
            petResponse.setCustomerName(customer.getName());
            Integer petId = Integer.parseInt(param.get("id").toString());
            List<String> images = petRepository.getImages(petId);
            petResponse.setImages(images);
            responses.add(petResponse);
        }
        return responses.get(0);
    }

    public List<PetHealth> getHealths(Integer id) {
        List<PetHealth> healths = petRepository.getHealths(id);
        healths.stream().forEach(h -> h.setTime(functionUtils.formatDate(h.getTime(), "dd/MM/yyyy HH:mm:ss")));
        return healths;
    }

    @Transactional
    public ResponseEntity<Object> create(Pet pet, PetImageUploadRequest imageUploadRequest) {
        petRepository.create(pet);
        Integer nextId = petRepository.lastId() + 1;
        Map<String, Object> param = new HashMap<>();
        for (int i = 0; i < imageUploadRequest.getImageFile().size(); i++) {
            param.put("petId", nextId);
            param.put("images", imageUploadRequest.getImageFile().get(i).getOriginalFilename());
            param.put("isMain", i == 0 ? 1 : 0);

            // TO-DO: Call API to add image upload request

        }
        return ResponseEntity.ok().build();
    }

    @Transactional
    public ResponseEntity<Object> update(Pet pet) {
        petRepository.update(pet);
        return ResponseEntity.ok().build();
    }

}
