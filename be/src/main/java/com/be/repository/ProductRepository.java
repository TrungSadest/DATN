package com.be.repository;

import com.be.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Products, String> {
    Boolean existsByProductName(String name);
}
