package com.be.model;

import com.be.entity.ProductDetails;

import javax.persistence.Column;

public class OrderItemModel {
    private Long orderItemId;

    private String orderId;

    private String productDetaiId;

    private Integer quantity;

    private Long unitPrice;

    private Long discountPrice;

    private Long totalPrice;

    public Long getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Long orderItemId) {
        this.orderItemId = orderItemId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getProductDetaiId() {
        return productDetaiId;
    }

    public void setProductDetaiId(String productDetaiId) {
        this.productDetaiId = productDetaiId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Long unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Long getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(Long discountPrice) {
        this.discountPrice = discountPrice;
    }

    public Long getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Long totalPrice) {
        this.totalPrice = totalPrice;
    }
}
