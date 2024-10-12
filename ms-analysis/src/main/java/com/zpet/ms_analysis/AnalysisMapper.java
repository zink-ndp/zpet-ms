package com.zpet.ms_analysis;

import com.zpet.ms_analysis.response.AnalysisResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AnalysisMapper {

    public List<AnalysisResponse> getAnalysisData(String date, String type);

}
