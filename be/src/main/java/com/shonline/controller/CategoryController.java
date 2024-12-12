package com.shonline.controller;

import com.shonline.entity.Categories;
import com.shonline.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/category")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("getAll")
    public ResponseEntity<List<Categories>> getAllCategories() {
        List<Categories> categories = new ArrayList<>();
        try {
            categories = categoryRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(categories);
    }
}
