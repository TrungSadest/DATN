package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "categories")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Categories {
    @Id
    @Column(name = "category_id")
    private String categoryId;

    @Column(name = "category_name")
    private String categoryName;
}
