package com.coffeeshop.coffeeshop.service;

import com.coffeeshop.coffeeshop.dto.AccountsDTO;
import com.coffeeshop.coffeeshop.payload.request.SignUpRequest;

import java.util.List;

public interface LoginService {
    List<AccountsDTO>getAllAccounts();
    AccountsDTO getAccounts(String username);
    int checkLogin(String username, String password);
    int addAccount(SignUpRequest signUpRequest);
    int changePassword(String username, String password, String newPassword);
    int deleteAccount(String username, String password);
}
