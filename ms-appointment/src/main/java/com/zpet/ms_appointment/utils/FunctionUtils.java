package com.zpet.ms_appointment.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

@Component
public class FunctionUtils {

    public LocalDate convertStringToDate(String dateString) {
        Integer d = Integer.valueOf(dateString.split("/")[1]);
        Integer m = Integer.valueOf(dateString.split("/")[0]);
        Integer y = Integer.valueOf(dateString.split("/")[2]);
        LocalDate date = LocalDate.of(y, m, d);
        return date;
    }

    public String formatDateTimeFromQuery(String dateTime, String pattern) {
        String date = dateTime.split(" ")[0];
        Integer d = Integer.valueOf(date.split("-")[2]);
        Integer M = Integer.valueOf(date.split("-")[1]);
        Integer y = Integer.valueOf(date.split("-")[0]);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(pattern);
        String dateFormated = LocalDate.of(y, M, d).format(formatter);
        if (dateTime.split(" ").length > 1) {
            String time = dateTime.split(" ")[1];
            dateFormated += time;
        }
        return dateFormated;
    }

    public List<String> seperateString(String string) {
        return Arrays.asList(string.split("_"));
    }

    public String extractPhoneNumber(String string) {
        // Define a regex pattern for the phone number
        Pattern pattern = Pattern.compile("\\b0[0-9]{9}\\b");  // This matches 10-digit phone numbers starting with '0'

        // Create a matcher object
        Matcher matcher = pattern.matcher(string);

        // Find and print the phone number
        if (matcher.find()) {
            return matcher.group();
        } else {
            return "Not Found";
        }
    }
}
