package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "cart_items")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartItems {
    @Id
    @Column(name = "cart_id")
    private String cartId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "product_detail_id")
    private String productDetailId;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_date")
    private Date updatedDate;

    @Column(name = "updated_by")
    private String updatedBy;
}
