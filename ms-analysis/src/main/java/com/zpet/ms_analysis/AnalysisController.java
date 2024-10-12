package com.zpet.ms_analysis;

import com.zpet.ms_analysis.response.SaleResponse;
import com.zpet.ms_analysis.response.TopResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/analysis")
public class AnalysisController {

    @Autowired
    AnalysisService analysisService;


    @GetMapping("/")
    public List<SaleResponse> getSaleData(@RequestParam String type){
        return analysisService.getSaleData(type);
    }

    @GetMapping("/topService")
    public List<TopResponse> getTopServiceData(@RequestParam String type){
        return analysisService.getTopService(type);
    }

    @GetMapping("/topCustomer")
    public List<TopResponse> getTopCustomer(@RequestParam String type){
        return analysisService.getTopCustomer(type);
    }

}
