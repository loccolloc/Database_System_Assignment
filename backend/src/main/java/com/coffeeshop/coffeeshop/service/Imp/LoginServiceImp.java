package com.coffeeshop.coffeeshop.service.Imp;

import com.coffeeshop.coffeeshop.dto.AccountsDTO;
import com.coffeeshop.coffeeshop.entity.Accounts;
import com.coffeeshop.coffeeshop.entity.Gifts;
import com.coffeeshop.coffeeshop.payload.request.SignUpRequest;
import com.coffeeshop.coffeeshop.repository.AccountsRepository;
import com.coffeeshop.coffeeshop.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LoginServiceImp implements LoginService {
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
            accountsDTO.setRole(accounts.getRole());
            accountsDTOList.add(accountsDTO);


        }
        return accountsDTOList;
    }

    @Override
    public AccountsDTO getAccounts(String username) {
        Accounts accounts = accountsRepository.findByUsername(username);
        AccountsDTO accountsDTO = new AccountsDTO();
        accountsDTO.setId(accounts.getId());
        accountsDTO.setUsername(accounts.getUsername());
        accountsDTO.setPassword(accounts.getPassword());
        accountsDTO.setDisplay_name(accounts.getDisplay_name());
        accountsDTO.setPoint(accountsDTO.getPoint());
        accountsDTO.setRole(accounts.getRole());
        return accountsDTO;
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

    @Override
    public List<Gifts> availableGift(String username) {
        List<Object[]> result = accountsRepository.availableGift(username);

        List<Gifts> giftsList = new ArrayList<>();
        for (Object[] objects : result) {
            Gifts gift = new Gifts();
            gift.setId(-1);
            gift.setName((String) objects[0]);
            gift.setQuantity((int) objects[1]);
            gift.setPoint((int) objects[2]);
            gift.setImage((byte[]) objects[3]);
            giftsList.add(gift);
        }
        return giftsList;
    }

    @Override
    public int exchangeGifts(int account_id, int gift_id, int quantity) {
        return accountsRepository.exGifts(account_id, gift_id, quantity);
    }
}
