package com.shonline.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "shop_menus")
public class ShopMenus {
    @Id
    @Column(name = "menu_id")
    private String menuId;

    @Column(name = "upper_menu_id")
    private String upperMenuId;

    @Column(name = "menu_name_en")
    private String menuNameEn;

    @Column(name = "menu_name_vi")
    private String menuNameVi;

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

    @OneToMany(mappedBy = "shopMenu", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<MenuRole> menuRoles;
}
