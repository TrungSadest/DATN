package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "shop_menus")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShopMenus {
    @Id
    @Column(name = "menu_id")
    private String menuId;

    @Column(name = "upper_menu_id")
    private String upperMenuId;

    @Column(name = "menu_name")
    private String menuName;

    @Column(name = "link_uri")
    private String linkUri;

    @Column(name = "display_order")
    private Integer displayOrder;

    @Column(name = "use_yn")
    private String useYn;

    @Column(name = "lev")
    private Integer lev;

    @Column(name = "description")
    private String description;
}
