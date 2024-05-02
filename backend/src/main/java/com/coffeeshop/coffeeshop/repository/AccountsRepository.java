package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts,Integer> {
  List<Accounts>findByUsernameAndPassword(String username, String password);


}
