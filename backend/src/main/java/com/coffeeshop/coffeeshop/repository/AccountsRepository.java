package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts, Integer> {
    Accounts findByUsernameAndPassword(String username, String password);

    @Procedure(name = "addAccount")
    int addAccount(String username, String password, String display_name);

  
  List<Accounts>findByUsername(String username);

    @Procedure(name = "changePassword")
    int changePassword(String username, String password, String new_password);

    @Procedure(name = "deleteAccount")
    int deleteAccount(String username, String password);
}
