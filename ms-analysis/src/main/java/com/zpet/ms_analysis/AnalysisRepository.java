package com.zpet.ms_analysis;

import com.zpet.ms_analysis.response.AnalysisResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AnalysisRepository {

    @Autowired
    AnalysisMapper analysisMapper;

    public List<AnalysisResponse> getAnalysisData(String date, String type){
        return analysisMapper.getAnalysisData(date, type);
    }

}
