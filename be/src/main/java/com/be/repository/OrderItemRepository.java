package com.be.repository;

import com.be.entity.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItems,Long> {
    List<OrderItems> findOrderItemsByOrderId(String orderId);
}
