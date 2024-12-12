package com.shonline.entity.id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MenuRoleId implements Serializable {
    private Integer menuId;
    private Integer roleId;

    // equals and hashCode implementation
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MenuRoleId that = (MenuRoleId) o;
        return Objects.equals(menuId, that.menuId) &&
                Objects.equals(roleId, that.roleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(menuId, roleId);
    }

}
