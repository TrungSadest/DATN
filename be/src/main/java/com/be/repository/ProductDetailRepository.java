package com.be.repository;

import com.be.entity.ProductDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductDetailRepository extends JpaRepository<ProductDetails,String > {
    List getAllByProductId (String id);
}
