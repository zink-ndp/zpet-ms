package com.zpet.ms_analysis;

import com.zpet.ms_analysis.response.AnalysisResponse;
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
    public List<AnalysisResponse> getAnalysisData(@RequestParam String type){
        return analysisService.getAnalysisData(type);
    }

}
