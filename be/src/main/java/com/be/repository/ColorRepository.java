package com.be.repository;

import com.be.entity.Colors;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<Colors, Integer> {
}
