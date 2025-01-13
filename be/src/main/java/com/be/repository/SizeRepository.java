package com.be.repository;

import com.be.entity.Sizes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SizeRepository extends JpaRepository<Sizes, Integer> {
}
