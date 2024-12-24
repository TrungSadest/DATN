package com.be.controller;


import com.be.entity.Products;
import com.be.model.ProductModel;
import com.be.model.ResponseData;
import com.be.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/get-all")
    public ResponseEntity<ResponseData> getAll(){
        ResponseData responseData = new ResponseData();
        try {
            List<Products> list = productRepository.findAll();
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
    public ResponseEntity<ResponseData> add (@RequestBody ProductModel productModel){
        ResponseData responseData = new ResponseData();
        try {
            if(productRepository.existsByProductName(productModel.getProductName())) {
                responseData.setStatus(false);
                return ResponseEntity.ok(responseData);
            }
            Products product = new Products();
            product.setProductName(productModel.getProductName());
            product.setThumbnail(productModel.getThumbnail());
            product.setCategoryId(productModel.getCategoryId());
            product.setUnitPrice(productModel.getUnitPrice());
            product.setWeight(productModel.getWeight());
            product.setBrandId(productModel.getBrandId());
            product.setSpecial(productModel.getSpecial());
            product.setDescription(productModel.getDescription());
            product.setDiscount(productModel.getDiscount());
            product.setDiscountPrice(productModel.getDiscountPrice());
            productRepository.save(product);
            responseData.setStatus(true);
            responseData.setResponseData(product);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    } @PutMapping("/update")
    public ResponseEntity<ResponseData> update (@RequestBody ProductModel productModel){
        ResponseData responseData = new ResponseData();
            Products product = new Products();
            product.setProductId(productModel.getProductId());
            product.setProductName(productModel.getProductName());
            product.setThumbnail(productModel.getThumbnail());
            product.setCategoryId(productModel.getCategoryId());
            product.setUnitPrice(productModel.getUnitPrice());
            product.setWeight(productModel.getWeight());
            product.setBrandId(productModel.getBrandId());
            product.setSpecial(productModel.getSpecial());
            product.setDescription(productModel.getDescription());
            product.setDiscount(productModel.getDiscount());
            product.setDiscountPrice(productModel.getDiscountPrice());
            productRepository.save(product);
            responseData.setStatus(true);
            responseData.setResponseData(product);
        return ResponseEntity.ok(responseData)  ;
    }

}
