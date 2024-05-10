package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Customers;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customers, Integer> {
    Customers findByAccount_id(int accountId);
}
