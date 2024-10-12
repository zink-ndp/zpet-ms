package com.zpet.ms_analysis;

import com.zpet.ms_analysis.response.AnalysisResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AnalysisService {

    @Autowired
    AnalysisRepository analysisRepository;

    public List<AnalysisResponse> getAnalysisData(String type){
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return analysisRepository.getAnalysisData(today.format(formatter), type);
    }

}
