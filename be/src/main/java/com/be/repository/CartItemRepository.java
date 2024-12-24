package com.be.repository;

import com.be.entity.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository <CartItems, String> {
    List<CartItems> findCartItemsByUserId(Integer userId);
    CartItems findCartItemsByProductDetailId(String id);
}
