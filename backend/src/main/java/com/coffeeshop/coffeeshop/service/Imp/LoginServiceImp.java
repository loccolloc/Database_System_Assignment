package com.coffeeshop.coffeeshop.service.Imp;

import com.coffeeshop.coffeeshop.dto.AccountsDTO;
import com.coffeeshop.coffeeshop.dto.CustomerDTO;
import com.coffeeshop.coffeeshop.entity.Accounts;
import com.coffeeshop.coffeeshop.entity.Customers;
import com.coffeeshop.coffeeshop.entity.Gifts;
import com.coffeeshop.coffeeshop.mapper.DTOMapper;
import com.coffeeshop.coffeeshop.payload.request.SignUpRequest;
import com.coffeeshop.coffeeshop.repository.AccountsRepository;
import com.coffeeshop.coffeeshop.repository.CustomerRepository;
import com.coffeeshop.coffeeshop.service.LoginService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LoginServiceImp implements LoginService {
    @Autowired
    AccountsRepository accountsRepository;
    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    DTOMapper mapper;

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
        accountsDTO.setPoint(accounts.getPoint());
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
        int res = accountsRepository.addAccount(signUpRequest.getUsername(), signUpRequest.getPassword(), signUpRequest.getDisplay_name());
        if (res != 0) return res;
        Customers customer = new Customers();
        customer.setAccount_id(accountsRepository.findByUsername(signUpRequest.getUsername()).getId());
        customerRepository.save(customer);
        return 0;
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

    @Override
    @Transactional
    public int changeInfo(int id, String name, String displayName) {
        try {
            accountsRepository.findById(id).ifPresent(accounts -> {
                accounts.setUsername(name);
                accounts.setDisplay_name(displayName);
            });
            return 0;
        } catch (Exception e) {
            return -1;
        }
    }

    @Override
    public CustomerDTO getCusByAccId(int accountId) {
        Customers customer = customerRepository.findByAccount_id(accountId);
        if (customer == null) return null;
        else return mapper.toCustomerDTO(customer);
    }

    @Override
    @Transactional
    public int putCustomer(CustomerDTO customerDTO) {
        try {
            customerRepository.findById(customerDTO.getId()).ifPresent(customers -> {
                customers.setLast_name(customerDTO.getLast_name());
                customers.setFirst_name(customerDTO.getFirst_name());
                customers.setGender(customerDTO.getGender());
                customers.setLocations(customerDTO.getLocations());
                customers.setPhone_number(customerDTO.getPhone_number());
            });
            return 0;
        } catch (Exception e) {
            return -1;
        }
    }
}
