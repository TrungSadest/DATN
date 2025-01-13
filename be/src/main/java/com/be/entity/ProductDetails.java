package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "product_details")
public class ProductDetails {
    @Id
    @Column(name = "product_detail_id")
    private String productDetailId;

    @PrePersist
    public void generateId() {
        if (this.productDetailId == null) {
            this.productDetailId = "SPCT" + System.currentTimeMillis();
        }
    }

    @Column(name = "product_id")
    private String productId;

    @ManyToOne
    @JoinColumn(name = "corlor_id")
    private Colors color;

    @ManyToOne
    @JoinColumn(name = "size_id")
    private Sizes size;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    public String getProductDetailId() {
        return productDetailId;
    }

    public void setProductDetailId(String productDetailId) {
        this.productDetailId = productDetailId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public Colors getColor() {
        return color;
    }

    public void setColor(Colors color) {
        this.color = color;
    }

    public Sizes getSize() {
        return size;
    }

    public void setSize(Sizes size) {
        this.size = size;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
