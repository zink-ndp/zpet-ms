package com.zpet.ms_analysis;

import com.zpet.ms_analysis.response.SaleResponse;
import com.zpet.ms_analysis.response.TopResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AnalysisService {

    @Autowired
    AnalysisRepository analysisRepository;

    public List<SaleResponse> getSaleData(String type){
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return  analysisRepository.getSaleData(today.format(formatter), type);
    }

    public List<TopResponse> getTopService(String type){
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return analysisRepository.getTopService(today.format(formatter), type);
    }

    public List<TopResponse> getTopCustomer(String type){
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return analysisRepository.getTopCustomer(today.format(formatter), type);
    }

}
