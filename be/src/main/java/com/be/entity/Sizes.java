package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "sizes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Sizes {
    @Id
    @Column(name = "size_id")
    private Integer sizeId;

    @Column(name = "size_name")
    private String sizeName;
}
