package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Products, Integer> {
    List<Products> findAllByType(String type);

    List<Products> findAllByName(String name);

    @Query(value = "declare @res varchar(50) " +
            "exec @res = Product_classified :id " +
            "select @res ", nativeQuery = true)
    String classifyProducts(int id);

    @Query(value = "set dateformat dmy " +
            "select dbo.CalculateTotalProfitByDate (?1, ?2)", nativeQuery = true)
    int calculateTotalProfitByDate(Timestamp start_date, Timestamp end_date);
}

