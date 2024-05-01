package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Products, Long> {

}
