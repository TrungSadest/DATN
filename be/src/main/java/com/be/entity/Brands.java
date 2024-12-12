package com.be.entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "brands")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Brands {
    @Id
    @Column(name = "brand_id")
    private Integer brandId;

    @Column(name = "brand_name")
    private String brandName;

    @Column(name = "logo")
    private String logo;
}
