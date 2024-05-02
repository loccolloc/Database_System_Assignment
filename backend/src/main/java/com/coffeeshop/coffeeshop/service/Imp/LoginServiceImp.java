package com.coffeeshop.coffeeshop.service.Imp;

import com.coffeeshop.coffeeshop.dto.AccountsDTO;
import com.coffeeshop.coffeeshop.payload.request.SignUpRequest;

import java.util.List;

public interface LoginServiceImp {
    List<AccountsDTO>getAllAccounts();
    boolean checkLogin(String username, String password);
    boolean addAccount(SignUpRequest signUpRequest);
    List<AccountsDTO> getAccounts(String username);

}
