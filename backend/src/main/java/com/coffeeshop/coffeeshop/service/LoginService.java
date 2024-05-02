package com.coffeeshop.coffeeshop.service;

import com.coffeeshop.coffeeshop.dto.AccountsDTO;
import com.coffeeshop.coffeeshop.entity.Accounts;
import com.coffeeshop.coffeeshop.payload.request.SignUpRequest;
import com.coffeeshop.coffeeshop.repository.AccountsRepository;
import com.coffeeshop.coffeeshop.service.Imp.LoginServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class LoginService implements LoginServiceImp {
    @Autowired
    AccountsRepository accountsRepository;
    @Override
    public List<AccountsDTO> getAllAccounts(){
        List<Accounts>listAccount=accountsRepository.findAll();
        List<AccountsDTO>accountsDTOList=new ArrayList<>();
        for(Accounts accounts:listAccount){
            AccountsDTO accountsDTO=new AccountsDTO();
            accountsDTO.setId(accounts.getId());
            accountsDTO.setUsername(accounts.getUsername());
            accountsDTO.setPassword(accounts.getPassword());
            accountsDTO.setDisplay_name(accounts.getDisplay_name());
            accountsDTO.setPoint(accountsDTO.getPoint());
            accountsDTO.setRole(accountsDTO.getRole());
            accountsDTOList.add(accountsDTO);


        }
        return accountsDTOList;

    }

    @Override
    public boolean checkLogin(String username, String password) {
      List<Accounts> listAccounts= accountsRepository.findByUsernameAndPassword(username,password);
        return listAccounts.size() > 0 ;
    }

    @Override
    public boolean addAccount(SignUpRequest signUpRequest) {
        Accounts accounts=new Accounts();
        accounts.setUsername(signUpRequest.getUsername());
        accounts.setPassword(signUpRequest.getPassword());
        accounts.setDisplay_name(signUpRequest.getDisplay_name());
        accounts.setRole(signUpRequest.getRole());

        try{
            accountsRepository.save(accounts);
            return true;
        }catch (Exception e)
        {
            return false;
        }


    }


}
