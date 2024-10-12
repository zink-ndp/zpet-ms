package com.zpet.ms_analysis.response;

import lombok.Data;

import java.util.List;

@Data
public class AnalysisDataResponse {

    private List<SaleResponse> sale;
    private List<TopResponse> topService;

}
