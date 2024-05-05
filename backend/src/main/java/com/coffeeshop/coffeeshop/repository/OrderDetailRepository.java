package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Order_details;
import com.coffeeshop.coffeeshop.entity.keys.IdOrder_details;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<Order_details, IdOrder_details> {
    List<Order_details> findAllByOrderId(int id);
}
