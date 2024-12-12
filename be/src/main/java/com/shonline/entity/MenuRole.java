package com.shonline.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shonline.entity.id.MenuRoleId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@IdClass(MenuRoleId.class)
@Table(name = "menu_role")
public class MenuRole {
    @Id
    @Column(name = "menu_id")
    private Integer menuId;

    @Id
    @Column(name = "role_id")
    private Integer roleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "menu_id", insertable = false, updatable = false, nullable = false)
    @JsonIgnore
    private ShopMenus shopMenu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", insertable = false, updatable = false, nullable = false)
    @JsonIgnore
    private Roles role;
}
