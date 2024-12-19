package com.be.controller;

import com.be.constant.Constants;
import com.be.entity.Categories;
import com.be.model.CategoryModel;
import com.be.model.ResponseData;
import com.be.repository.CategoriRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @PostMapping("/add")
    public ResponseEntity<ResponseData> add (@RequestBody CategoryModel categoryModel){
        ResponseData responseData = new ResponseData();
        try {
            if(categoriRepository.existsByCategoryName(categoryModel.getCategoryName())) {
                responseData.setStatus(false);
                responseData.setMsgCode(Constants.CATEGORY_IS_EXIST);
                return ResponseEntity.ok(responseData);
            }
            Categories category = new Categories();
            category.setCategoryName(categoryModel.getCategoryName());
            category.setDel(true);
            categoriRepository.save(category);
            responseData.setStatus(true);
            responseData.setResponseData(category);
        }
        catch (Exception e) {
            e.printStackTrace();
            responseData.setStatus(false);
        }
        return ResponseEntity.ok(responseData)  ;
    }
    @PutMapping("/update")
    public ResponseEntity<ResponseData> update (@RequestBody CategoryModel categoryModel){
        ResponseData responseData = new ResponseData();
        Categories category = new Categories();
        category.setCategoryId(categoryModel.getCategoryId());
        category.setCategoryName(categoryModel.getCategoryName());
        category.setDel(true);
        categoriRepository.save(category);
        responseData.setStatus(true);
        responseData.setResponseData(category);
        return ResponseEntity.ok(responseData)  ;
    }

}
