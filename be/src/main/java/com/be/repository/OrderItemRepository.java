package com.be.repository;

import com.be.entity.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItems,Long> {
}
