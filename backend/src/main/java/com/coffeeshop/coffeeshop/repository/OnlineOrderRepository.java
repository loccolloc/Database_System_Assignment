package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Online_orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OnlineOrderRepository extends JpaRepository<Online_orders, Integer> {
    List<Online_orders> findAllByAccountId(int id);

    @Query("SELECT o FROM Online_orders o WHERE o.account.id = ?1 AND o.orders.state = ?2")
    List<Online_orders> findAllByAccountIdAndState(int id, String state);
}
