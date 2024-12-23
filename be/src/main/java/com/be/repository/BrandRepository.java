package com.be.repository;

import com.be.entity.Brands;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BrandRepository extends JpaRepository<Brands, Integer> {
}
