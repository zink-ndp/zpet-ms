package com.zpet.ms_customer.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

@Component
public class FunctionUtils {
    
    public String formatDate(String input, String pattern) {
		String[] splitDate = input.split(" ")[0].split("-");
		Integer d = Integer.valueOf(splitDate[2]);
		Integer M = Integer.valueOf(splitDate[1]);
		Integer y = Integer.valueOf(splitDate[0]);

        String[] splitTime = input.split(" ")[1].split(":");
		Integer h = Integer.valueOf(splitTime[0]);
		Integer m = Integer.valueOf(splitTime[1]);
		Integer s = Integer.valueOf(splitTime[2]);

		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
		LocalDate date = LocalDate.of(y, M, d);
        LocalTime time = LocalTime.of(h, m, s);
        String dateTime = LocalDateTime.of(date, time).format(formatter);
		return dateTime;
	}

}
