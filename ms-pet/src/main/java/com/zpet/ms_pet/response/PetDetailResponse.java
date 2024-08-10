package com.zpet.ms_pet.response;

import java.util.List;

import lombok.Data;

@Data
public class PetDetailResponse {
    
    private Integer id;
    private String type;
    private String name;
    private String specie;
    private String gender;
    private String birthday;
    private String customerName;
    private List<String> images;

}
