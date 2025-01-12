package com.be.controller;

import com.be.entity.ProductDetails;
import com.be.model.ProductDetailModel;
import com.be.model.ResponseData;
import com.be.repository.ProductDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    public ResponseEntity<ResponseData> add (@RequestBody ProductDetailModel productDetailModel){
        ResponseData responseData = new ResponseData();
        try {

            ProductDetails productDetails = new ProductDetails();
            productDetails.setProductId(productDetailModel.getProductId());
            productDetails.setCorlorId(productDetailModel.getCorlorId());
            productDetails.setSizeId(productDetailModel.getSizeId());
            productDetails.setQuantity(productDetailModel.getQuantity());
            productDetails.setDescription(productDetailModel.getDescription());
            productDetails.setImageUrl(productDetailModel.getImageUrl());
            productDetailRepository.save(productDetails);
            responseData.setResponseData(productDetails);
            responseData.setStatus(true);

        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    }
}
