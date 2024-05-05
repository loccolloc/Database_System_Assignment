package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Products, Integer> {
    List<Products> findAllByType(String type);

    List<Products> findAllByName(String name);

}
