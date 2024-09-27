package com.zpet.ms_pet.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ImageUploadRequest {

    private MultipartFile image;
    private Integer firstImage; // 1-YES | 2-NO

}
