package com.shonline.entity;
import javax.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "common_codes")
public class CommonCodes {
    @Id
    @Column(name = "comm_cd")
    private String commCd;

    @Column(name = "comm_nm_en")
    private String commNmEn;

    @Column(name = "comm_nm_vi")
    private String commNmVi;

    @Column(name = "description")
    private String description;

    @Column(name = "lev")
    private Integer lev;

    @Column(name = "up_comm_cd")
    private String upCommCd;

    @Column(name = "use_yn")
    private String useYn;

    @Column(name = "value_config")
    private String valueConfig;

    @OneToMany(mappedBy = "commonCode", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<InventoryTransactions> inventoryTransaction;

    @OneToMany(mappedBy = "commonCode", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Discounts> discounts;
}
