package com.zpet.ms_pet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MsPetApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsPetApplication.class, args);
	}

}
