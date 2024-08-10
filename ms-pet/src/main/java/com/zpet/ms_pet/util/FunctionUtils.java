package com.zpet.ms_pet.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

@Component
public class FunctionUtils {
    
     public String formatDate(String input, String pattern) {
		String[] splitDate = input.split(" ")[0].split("-");
		Integer d = Integer.valueOf(splitDate[2]);
		Integer M = Integer.valueOf(splitDate[1]);
		Integer y = Integer.valueOf(splitDate[0]);

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		String date = LocalDate.of(y, M, d).format(formatter);
		return date;
	}

}
