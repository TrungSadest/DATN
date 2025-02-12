package com.be.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "menu_role")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MenuRole {
    @Id
    @Column(name = "menu_role_id")
    private Integer menuRoleId;

    @Column(name = "role_id")
    private String roleId;

    @Column(name = "menu_id")
    private String menuId;
}
