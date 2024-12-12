package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "product_images")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductImages {
    @Id
    @Column(name = "image_id")
    private String imageId;

    @Column(name = "product_detail_id")
    private String productDetailId;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "is_thumbnail")
    private Boolean isThumbnail;
}
