package com.zpet.ms_pet.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

@Component
public class FunctionUtils {

     public String formatDate(String input, String pattern) {
		//Input:	2024-10-04 13:15:51
		String[] splitDate = input.split(" ")[0].split("-");
		int d = Integer.parseInt(splitDate[2]);
		int M = Integer.parseInt(splitDate[1]);
		int y = Integer.parseInt(splitDate[0]);

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
         return LocalDate.of(y, M, d).format(formatter);
	}

}
