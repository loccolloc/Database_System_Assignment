package com.coffeeshop.coffeeshop.service;

import com.coffeeshop.coffeeshop.dto.AccountsDTO;
import com.coffeeshop.coffeeshop.dto.CustomerDTO;
import com.coffeeshop.coffeeshop.entity.Gifts;
import com.coffeeshop.coffeeshop.payload.request.SignUpRequest;

import java.util.List;

public interface LoginService {
    List<AccountsDTO>getAllAccounts();
    AccountsDTO getAccounts(String username);
    int checkLogin(String username, String password);
    int addAccount(SignUpRequest signUpRequest);
    int changePassword(String username, String password, String newPassword);
    int deleteAccount(String username, String password);
    List<Gifts> availableGift(String username);
    int exchangeGifts(int account_id, int gift_id, int quantity);

    int changeInfo(int id, String name, String displayName);

    CustomerDTO getCusByAccId(int accountId);

    int putCustomer(CustomerDTO customerDTO);
}
