package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Gifts;
import com.coffeeshop.coffeeshop.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Products, Integer> {
    @Query(value = "declare @result table (name nvarchar(255), quantity int, point int, image varbinary(max))  " +
            "exec @result = Available_gift ?1 " +
            "select * from @result ", nativeQuery = true)
    List<Gifts> availableGift(String username);

    @Query(value = "declare @result int " +
            "exec @result = Ex_gifts ?1, ?2, ?3 " +
            "select @result", nativeQuery = true)
    int exGifts(int id, int quantity, int price);

}
