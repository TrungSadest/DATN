package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Orders {
    @Id
    @Column(name = "order_id")
    private String orderId;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "discount_id")
    private String discountId;

    @Column(name = "total_price")
    private Long totalPrice;

    @Column(name = "status")
    private String status;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "updated_date")
    private Date updatedDate;

    @Column(name = "updated_by")
    private String updatedBy;
}
