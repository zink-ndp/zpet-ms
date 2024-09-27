package com.zpet.ms_pet.request;

import com.zpet.ms_pet.model.Pet;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class PetCreateRequest {

    private Pet pet;
//    private List<MultipartFile> images;
    private  MultipartFile images;

}
