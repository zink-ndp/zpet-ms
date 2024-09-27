package com.zpet.ms_pet.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.zpet.ms_pet.model.Pet;
import com.zpet.ms_pet.model.PetHealth;

@Mapper
public interface PetMapper {

    public Integer lastId();

    public Integer lastImageId();

    public List<Pet> getAll(Map<String, Object> param);

    public List<String> getImages (Integer id);

    public List<PetHealth> getHealths(Integer id);

    public void create(Pet pet);

    public void createImage(Map<String, Object> param);

    public void update(Pet pet);

}
