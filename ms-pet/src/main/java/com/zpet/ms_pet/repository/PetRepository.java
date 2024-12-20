package com.zpet.ms_pet.repository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.zpet.ms_pet.mapper.PetMapper;
import com.zpet.ms_pet.model.Pet;
import com.zpet.ms_pet.model.PetHealth;

@Repository
public class PetRepository {

    @Autowired
    PetMapper petMapper;

    public Integer lastId() {
        return petMapper.lastId();
    }

    public List<Pet> getAll(Map<String, Object> param) {
        return petMapper.getAll(param);
    }

    public List<String> getImages(Integer id) {
        return petMapper.getImages(id);
    }

    public List<PetHealth> getHealths(Integer id) {
        return petMapper.getHealths(id);
    }

    public void insertAtTime(LocalDateTime timestamp){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String timeStamp = timestamp.format(formatter);
        petMapper.insertAtTime(timeStamp);
    }

    public void create(Pet pet) {
        petMapper.create(pet);
    }

    public void createImage(Map<String, Object> param) {
        Integer nextImageId = petMapper.lastImageId()+1;
        param.put("nextImageId", nextImageId);
        petMapper.createImage(param);
    }

    public void updateHealth(PetHealth petHealth) {
      petMapper.updateHealth(petHealth);
    }

    public void update(Pet pet) {
        petMapper.update(pet);
    }

}
