package com.be.controller;

import com.be.entity.Categories;
import com.be.entity.Sizes;
import com.be.model.ResponseData;
import com.be.repository.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/size")
public class SizeController {
    @Autowired
    private SizeRepository sizeRepository;

    @GetMapping("/get-all")
    public ResponseEntity<ResponseData> getAll(){
        ResponseData responseData = new ResponseData();
        try {
            List<Sizes> list = sizeRepository.findAll();
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
