package com.be.controller;

import com.be.entity.ProductDetails;
import com.be.entity.Products;
import com.be.model.ResponseData;
import com.be.repository.ProductDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product-detail")
public class ProductDetailController {
    @Autowired
    private ProductDetailRepository productDetailRepository;

    @GetMapping("/get-all")
    public ResponseEntity<ResponseData> getAll(){
        ResponseData responseData = new ResponseData();
        try {
            List<ProductDetails> list = productDetailRepository.findAll();
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
