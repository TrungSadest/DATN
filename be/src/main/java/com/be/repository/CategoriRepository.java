package com.be.repository;

import com.be.entity.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriRepository extends JpaRepository<Categories, String> {
    Boolean existsByCategoryName(String name);
}
