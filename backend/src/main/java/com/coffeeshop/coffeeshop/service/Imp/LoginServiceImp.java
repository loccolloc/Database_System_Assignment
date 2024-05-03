package com.coffeeshop.coffeeshop.service.Imp;

import com.coffeeshop.coffeeshop.dto.AccountsDTO;
import com.coffeeshop.coffeeshop.entity.Accounts;
import com.coffeeshop.coffeeshop.payload.request.SignUpRequest;
import com.coffeeshop.coffeeshop.repository.AccountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LoginServiceImp implements com.coffeeshop.coffeeshop.service.LoginService {
    @Autowired
    AccountsRepository accountsRepository;

    @Override
    public List<AccountsDTO> getAllAccounts() {
        List<Accounts> listAccount = accountsRepository.findAll();
        List<AccountsDTO> accountsDTOList = new ArrayList<>();
        for (Accounts accounts : listAccount) {
            AccountsDTO accountsDTO = new AccountsDTO();
            accountsDTO.setId(accounts.getId());
            accountsDTO.setUsername(accounts.getUsername());
            accountsDTO.setPassword(accounts.getPassword());
            accountsDTO.setDisplay_name(accounts.getDisplay_name());
            accountsDTO.setPoint(accountsDTO.getPoint());
            accountsDTOList.add(accountsDTO);


        }
        return accountsDTOList;

    }

    @Override
    public int checkLogin(String username, String password) {
        Accounts account = accountsRepository.findByUsernameAndPassword(username, password);
        if (account == null) {
            return -1;
        }
        return account.getId();

    }

    @Override
    public int addAccount(SignUpRequest signUpRequest) {
        return accountsRepository.addAccount(signUpRequest.getUsername(), signUpRequest.getPassword(), signUpRequest.getDisplay_name());
    }

    @Override
    public int changePassword(String username, String password, String newPassword) {
        return accountsRepository.changePassword(username, password, newPassword);
    }

    @Override
    public int deleteAccount(String username, String password) {
        return accountsRepository.deleteAccount(username, password);
    }
}
