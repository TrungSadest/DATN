package com.shonline.entity;

import com.shonline.entity.id.ProductDiscountsId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@IdClass(ProductDiscountsId.class)
@Table(name = "product_discounts")
public class ProductDiscounts {
    @Id
    @Column(name = "product_id")
    private Integer productId;

    @Id
    @Column(name = "discount_id")
    private Integer discountId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Products product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discount_id", insertable = false, updatable = false)
    private Discounts discount;
}
