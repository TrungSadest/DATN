package com.shonline.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shonline.entity.id.UserRolesId;
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
@IdClass(UserRolesId.class)
@Table(name = "user_roles")
public class UserRoles {
    @Id
    @Column(name = "user_id")
    private Integer userId;

    @Id
    @Column(name = "role_id")
    private Integer roleId;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false, nullable = false)
    private Users user;

    @ManyToOne
    @JoinColumn(name = "role_id", insertable = false, updatable = false, nullable = false)
    private Roles role;
}
