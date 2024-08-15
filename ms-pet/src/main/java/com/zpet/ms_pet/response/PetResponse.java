package com.zpet.ms_pet.response;

import lombok.Data;

@Data
public class PetResponse {
    
    private Integer id;
    private String type;
    private String name;
    private String specie;
    private String gender;
    private String birthday;
    private String customerName;
    private String image;

}
