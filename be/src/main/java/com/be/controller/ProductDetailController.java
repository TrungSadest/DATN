package com.be.controller;

import com.be.entity.Categories;
import com.be.entity.Colors;
import com.be.entity.ProductDetails;
import com.be.entity.Sizes;
import com.be.model.ProductDetailModel;
import com.be.model.ResponseData;
import com.be.repository.ColorRepository;
import com.be.repository.ProductDetailRepository;
import com.be.repository.SizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-detail")
public class ProductDetailController {
    @Autowired
    private ProductDetailRepository productDetailRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private SizeRepository sizeRepository;
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
    @GetMapping("/get-by/{id}")
    public ResponseEntity<ResponseData> getById(@PathVariable String id){
        ResponseData responseData = new ResponseData();
        try {
            List<ProductDetails> list = productDetailRepository.getAllByProductId(id);
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
            Colors colors = colorRepository.findById(productDetailModel.getColorId())
                    .orElseThrow(() -> new RuntimeException("Color not found with ID: " + productDetailModel.getColorId()));
            productDetails.setColor(colors);
            Sizes sizes = sizeRepository.findById(productDetailModel.getSizeId())
                    .orElseThrow(() -> new RuntimeException("Category not found with ID: " + productDetailModel.getSizeId()));
            productDetails.setSize(sizes);
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
