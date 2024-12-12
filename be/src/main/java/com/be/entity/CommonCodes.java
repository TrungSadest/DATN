package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "common_codes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommonCodes {
    @Id
    @Column(name = "comm_cd")
    private String commCd;

    @Column(name = "comm_nm")
    private String commNm;

    @Column(name = "description")
    private String description;

    @Column(name = "lev")
    private Integer lev;

    @Column(name = "up_comm_cd")
    private String upCommCd;

    @Column(name = "use_yn")
    private String useYn;

    @Column(name = "value_config")
    private String valueConfig;}
