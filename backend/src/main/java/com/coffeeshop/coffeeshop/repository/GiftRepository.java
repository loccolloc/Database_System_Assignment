package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Gifts;
import com.coffeeshop.coffeeshop.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GiftRepository extends JpaRepository<Gifts, Integer> {


}
