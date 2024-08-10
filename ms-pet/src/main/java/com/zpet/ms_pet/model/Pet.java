package com.zpet.ms_pet.model;

import lombok.Data;

@Data
public class Pet {
    
    private Integer id;
    private Integer typeId;
    private String name;
    private String specie;
    private Integer gender;
    private String birthday;
    private Integer customerId;
    private String image;

}
