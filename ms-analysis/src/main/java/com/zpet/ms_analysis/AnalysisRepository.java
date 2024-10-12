package com.zpet.ms_analysis;

import com.zpet.ms_analysis.response.SaleResponse;
import com.zpet.ms_analysis.response.TopResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AnalysisRepository {

    @Autowired
    AnalysisMapper analysisMapper;

    public List<SaleResponse> getSaleData(String date, String type){
        return analysisMapper.getSaleData(date, type);
    }

    public List<TopResponse> getTopService(String date, String type){
        return analysisMapper.getTopService(date, type);
    }

    public List<TopResponse> getTopCustomer(String date, String type){
        return analysisMapper.getTopCustomer(date, type);
    }

    public List<TopResponse> getServiceCount(String date, String type){
        return analysisMapper.getServiceCount(date, type);
    }

}
