package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "colors")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Colors {
    @Id
    @Column(name = "color_id")
    private Integer colorId;

    @Column(name = "color_name")
    private String colorName;

    @Column(name = "color_code")
    private String colorCode;
}
