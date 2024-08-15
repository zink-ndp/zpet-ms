package com.zpet.ms_appointment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MsAppointmentApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsAppointmentApplication.class, args);
	}

}
