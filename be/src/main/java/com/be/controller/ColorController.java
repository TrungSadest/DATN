package com.be.controller;

import com.be.entity.Categories;
import com.be.entity.Colors;
import com.be.model.ResponseData;
import com.be.repository.ColorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/color")
public class ColorController {
    @Autowired
    private ColorRepository colorRepository;

    @GetMapping("/get-all")
    public ResponseEntity<ResponseData> getAll(){
        ResponseData responseData = new ResponseData();
        try {
            List<Colors> list = colorRepository.findAll();
            responseData.setResponseData(list);
            responseData.setStatus(true);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    }

}
