package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "order_items")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItems {
    @Id
    @Column(name = "order_item_id")
    private Long orderItemId;

    @Column(name = "order_id")
    private String orderId;

    @Column(name = "product_detail_id")
    private String productDetailId;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "unit_price")
    private Long unitPrice;

    @Column(name = "discount_price")
    private Long discountPrice;

    @Column(name = "total_price")
    private Long totalPrice;
}
