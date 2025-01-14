package com.be.controller;

import com.be.entity.*;
import com.be.model.BrandModel;
import com.be.model.CategoryModel;
import com.be.model.ResponseData;
import com.be.repository.BrandRepository;
import com.be.repository.CategoriRepository;
import com.be.repository.ProductDetailRepository;
import com.be.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoriRepository categoriRepository;
    @Autowired
    private BrandRepository brandRepository;
    @Autowired
    private ProductDetailRepository productDetailRepository;

    @GetMapping("/product/get-all")
    public ResponseEntity<ResponseData> getAllProduct(){
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
    @GetMapping("/category/get-all")
    public ResponseEntity<ResponseData> getAllCategory(){
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
    @GetMapping("/brand/get-all")
    public ResponseEntity<ResponseData> getAllBrand(){
        ResponseData responseData = new ResponseData();
        try {
            List<Brands> list = brandRepository.findAll();
            responseData.setResponseData(list);
            responseData.setStatus(true);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    }
    @GetMapping("/product/get-by-category")
    public ResponseEntity<ResponseData> getProductsByCategory(@RequestBody CategoryModel categoryModel){
        ResponseData responseData = new ResponseData();
        try {
            Categories  categories =  new Categories();
            categories.setCategoryId(categoryModel.getCategoryId());
            categories.setCategoryName(categoryModel.getCategoryName());
            List<Products> products = productRepository.findProductsByCategories(categories);
            responseData.setResponseData(products);
            responseData.setStatus(true);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    }
    @GetMapping("/product/get-by-brand")
    public ResponseEntity<ResponseData> getProductsByBrand(@RequestBody BrandModel brandModel){
        ResponseData responseData = new ResponseData();
        try {
            Brands brands = new Brands();
            brands.setBrandId(brandModel.getBrandId());
            brands.setBrandName(brandModel.getBrandName());
            List<Products> products = productRepository.findProductsByBrands(brands);
            responseData.setResponseData(products);
            responseData.setStatus(true);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    }
    @GetMapping("/product-detail/get-by/{id}")
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
}
