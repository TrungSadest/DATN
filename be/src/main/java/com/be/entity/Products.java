package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Products {
    @Id
    @Column(name = "product_id")
    private String productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "description")
    private String description;

    @Column(name = "category_id")
    private String categoryId;

    @Column(name = "discount_price")
    private Long discountPrice;

    @Column(name = "unit_price")
    private Long unitPrice;

    @Column(name = "is_discount")
    private Boolean isDiscount;

    @Column(name = "is_special")
    private Boolean isSpecial;

    @Column(name = "material_id")
    private Integer materialId;

    @Column(name = "brand_id")
    private Integer brandId;

    @Column(name = "weight")
    private Long weight;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_date")
    private Date updatedDate;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "thumbnail")
    private String thumbnail;
}
