package com.be.repository;

import com.be.entity.Brands;
import com.be.entity.Categories;
import com.be.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Products, String> {
    Boolean existsByProductName(String name);
    List<Products> findProductsByProductNameLike(String name);
    List<Products> findProductsByBrands(Brands brands);
    List<Products> findProductsByCategories(Categories categories);
}
