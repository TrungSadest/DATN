package com.shonline.repository;

import com.shonline.entity.UserRoles;
import com.shonline.entity.id.UserRolesId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRoleRepository extends JpaRepository<UserRoles, UserRolesId> {
    List<UserRoles> findByUserId(Integer userId);
}
