package com.be.controller;

import com.be.entity.Categories;
import com.be.model.ResponseData;
import com.be.repository.CategoriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoriController {
    @Autowired
    private CategoriRepository categoriRepository;

    @GetMapping("/get-all")
    public ResponseEntity<ResponseData> getAll(){
        ResponseData responseData = new ResponseData();
        try {
            List<Categories> list = categoriRepository.findAll();
            responseData.setResponseData(list);
            responseData.setStatus(true);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
      return ResponseEntity.ok(responseData)  ;
    }
//    @PostMapping("/add")
//    public ResponseEntity<ResponseData> add (){
//
//    }
}
