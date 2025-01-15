package com.be.repository;

import com.be.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByUsername(String username);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
