package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Gifts;
import com.coffeeshop.coffeeshop.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Products, Integer> {
    @Query(value = "exec Available_gift ?1 ", nativeQuery = true)
    Gifts[] availableGift(String username);

    @Query(value = "declare @result int " +
            "exec @result = Ex_gifts ?1, ?2, ?3 " +
            "select @result", nativeQuery = true)
    int exGifts(int id, int quantity, int price);

    List<Products> findAllByType(String type);

    List<Products> findAllByName(String name);

}
