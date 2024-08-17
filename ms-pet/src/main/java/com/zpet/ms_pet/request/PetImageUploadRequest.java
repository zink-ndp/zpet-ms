package com.zpet.ms_pet.request;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class PetImageUploadRequest {
    
    private Integer petId;
    private List<MultipartFile> imageFile;
	public Integer getPetId() {
		return petId;
	}
	public void setPetId(Integer petId) {
		this.petId = petId;
	}
	public List<MultipartFile> getImageFile() {
		return imageFile;
	}
	public void setImageFile(List<MultipartFile> imageFile) {
		this.imageFile = imageFile;
	}
    
    

}
