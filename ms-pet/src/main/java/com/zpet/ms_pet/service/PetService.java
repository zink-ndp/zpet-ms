package com.zpet.ms_pet.service;

import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zpet.ms_pet.request.ImageUploadRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.MultipartBodyBuilder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.zpet.ms_pet.model.Customer;
import com.zpet.ms_pet.model.Pet;
import com.zpet.ms_pet.model.PetHealth;
import com.zpet.ms_pet.repository.PetRepository;
import com.zpet.ms_pet.response.PetDetailResponse;
import com.zpet.ms_pet.response.PetResponse;
import com.zpet.ms_pet.util.FunctionUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class PetService {

    @Autowired
    PetRepository petRepository;

    @Autowired
    FunctionUtils functionUtils;

    @Value("${imgur.client.id}")
    private String IMGUR_CLIENT_ID;

    @Value("${host.url}")
    private String HOST_URL;

    private static final String IMGUR_UPLOAD_URL = "https://api.imgur.com/3/image";

    public List<PetResponse> getAll(Map<String, Object> param) {
        List<Pet> pets = petRepository.getAll(param);

        List<PetResponse> responses = new ArrayList<>();

        for (Pet p : pets) {
            PetResponse petResponse = new PetResponse();
            BeanUtils.copyProperties(p, petResponse);
            petResponse.setGender(p.getGender() == 1 ? "Đực" : "Cái");
            petResponse.setType(p.getTypeId() == 1 ? "Chó" : "Mèo");
            petResponse.setBirthday(functionUtils.formatDate(p.getBirthday(), "dd/MM/yyyy"));
            if (petResponse.getImage() == null) {
                petResponse.setImage("Ozgwrq2s.jpeg");
            }
            Integer customerId = p.getCustomerId();
            RestTemplate restTemplate = new RestTemplate();
            Customer customer = restTemplate
                    .getForObject(
                            HOST_URL + "/api/customer/byid?id=" + customerId,
                            Customer.class);
            assert customer != null;
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
                            HOST_URL + "/api/customer/byid?id=" + customerId,
                            Customer.class);
            assert customer != null;
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
        healths.forEach(h -> h.setTime(functionUtils.formatDate(h.getTime(), "dd/MM/yyyy")));
        return healths;
    }

    @Transactional
    public ResponseEntity<Object> create(Pet pet) {
        Integer nextId = petRepository.lastId() + 1;
        pet.setId(nextId);
        petRepository.create(pet);
        return ResponseEntity.ok(pet);
    }

    @Transactional
    public ResponseEntity<Object> update(Pet pet) {
        petRepository.update(pet);
        return ResponseEntity.ok().build();
    }

    public void uploadImage(ImageUploadRequest request) throws Exception {

        MultipartFile image = request.getImage();
        Integer firstImage = request.getFirstImage();

        // Set up the headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("Authorization", "Client-ID " + IMGUR_CLIENT_ID);

        // Create the body with the image
        MultipartBodyBuilder bodyBuilder = new MultipartBodyBuilder();
        bodyBuilder.part("image", image.getResource());  // Use the file as a resource
        // Build the entity
        HttpEntity<?> entity = new HttpEntity<>(bodyBuilder.build(), headers);

        // Use RestTemplate to send the POST request
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(
                IMGUR_UPLOAD_URL, HttpMethod.POST, entity, String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = null;
        try {
            rootNode = objectMapper.readTree(response.getBody());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        String imgName = rootNode.path("data").path("id").asText()
                + "s." + rootNode.path("data").path("type").asText().split("/")[1];

        Integer petId = petRepository.lastId();

        Map<String, Object> param = new HashMap<>();
        param.put("petId", petId);
        param.put("imageName", imgName);
        param.put("isMain", firstImage);

        petRepository.createImage(param);

    }
}
