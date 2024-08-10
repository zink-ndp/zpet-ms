package com.zpet.ms_pet.request;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class PetImageUploadRequest {
    
    private Integer petId;
    private List<MultipartFile> imageFile;

}
