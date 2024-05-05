package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AccountsRepository extends JpaRepository<Accounts, Integer> {
    Accounts findByUsernameAndPassword(String username, String password);

    Accounts findByUsername(String username);

    @Query(value = "declare @result int " +
            "exec @result = Add_account @username = ?1, @password = ?2, @display_name = ?3 " +
            "select @result", nativeQuery = true)
    int addAccount(String username, String password, String display_name);


    @Query(value = "declare @result int " +
            "exec @result = Change_password @username = ?1, @password = ?2, @new_password = ?3 " +
            "select @result", nativeQuery = true)
    int changePassword(String username, String password, String new_password);

    @Query(value = "declare @result int " +
            "exec @result = Delete_account @username = ?1, @password = ?2 " +
            "select @result", nativeQuery = true)
    int deleteAccount(String username, String password);

    @Query(value = "exec Available_gift ?1 ", nativeQuery = true)
    List<Object[]> availableGift(String username);

    @Query(value = "declare @result int " +
            "exec @result = Ex_gifts ?1, ?2, ?3 " +
            "select @result", nativeQuery = true)
    int exGifts(int account_id, int gift_id, int quantity);
}
