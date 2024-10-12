package com.zpet.ms_analysis;

import com.zpet.ms_analysis.response.SaleResponse;
import com.zpet.ms_analysis.response.TopResponse;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AnalysisMapper {

    public List<SaleResponse> getSaleData(String date, String type);

    public List<TopResponse> getTopService(String date, String type);

    public List<TopResponse> getTopCustomer(String date, String type);

    public List<TopResponse> getServiceCount(String date, String type);

}
