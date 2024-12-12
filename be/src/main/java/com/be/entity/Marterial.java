package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "marterial")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Marterial {
    @Id
    @Column(name = "material_id")
    private Integer materialId;

    @Column(name = "material_name")
    private String materialName;}
