package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Online_orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OnlineOrderRepository extends JpaRepository<Online_orders, Integer> {
    List<Online_orders> findAllByAccountId(int id);
}
