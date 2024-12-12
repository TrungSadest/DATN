package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "product_details")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDetails {
    @Id
    @Column(name = "product_detail_id")
    private String productDetailId;

    @Column(name = "product_id")
    private String productId;

    @Column(name = "corlor_id")
    private Integer corlorId;

    @Column(name = "size_id")
    private Integer sizeId;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "description")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;
}
