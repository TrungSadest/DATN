package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "discounts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Discounts {
    @Id
    @Column(name = "discount_id")
    private String discountId;

    @Column(name = "discount_value")
    private Integer discountValue;

    @Column(name = "discount_type")
    private String discountType;

    @Column(name = "start_date")
    private Date startDate;

    @Column(name = "end_date")
    private Date endDate;

    @Column(name = "status")
    private String status;

    @Column(name = "description")
    private String description;

    @Column(name = "condition")
    private Integer condition;}
