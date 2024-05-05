package com.coffeeshop.coffeeshop.controller;

import com.coffeeshop.coffeeshop.dto.AccountsDTO;
import com.coffeeshop.coffeeshop.entity.Accounts;
import com.coffeeshop.coffeeshop.entity.Gifts;
import com.coffeeshop.coffeeshop.payload.ResponseData;
import com.coffeeshop.coffeeshop.payload.request.SignUpRequest;
import com.coffeeshop.coffeeshop.repository.AccountsRepository;

import com.coffeeshop.coffeeshop.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    LoginService loginService;
    @Autowired
    AccountsRepository accountsRepository;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestParam String username, @RequestParam String password) {
        ResponseData responseData = new ResponseData();
        if (loginService.checkLogin(username, password) != -1) {
            responseData.setData(true);
            Accounts account = accountsRepository.findByUsernameAndPassword(username, password);
            responseData.setRole(account.getRole());
            responseData.setUsername(account.getUsername());
       }else{

            responseData.setData(false);
        }
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpRequest signUpRequest) {
        ResponseData responseData = new ResponseData();
        responseData.setData(loginService.addAccount(signUpRequest));
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PutMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestParam String username, @RequestParam String password, @RequestParam String newPassword) {
        ResponseData responseData = new ResponseData();
        responseData.setData(loginService.changePassword(username, password, newPassword));
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAccount(@RequestParam String username, @RequestParam String password) {
        ResponseData responseData = new ResponseData();
        responseData.setData(loginService.deleteAccount(username, password));
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
    @GetMapping("/getprofile")
    public ResponseEntity<?> getProfile(@RequestParam String username){

        ResponseData responseData=new ResponseData();
        AccountsDTO accountsDTO=loginService.getAccounts(username);
        List<AccountsDTO> li = new ArrayList<>();
        li.add(accountsDTO);
        responseData.setData(li);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/availableGift")
    public List<Gifts> availableGift(@RequestParam String username){
        return loginService.availableGift(username);
    }

    @GetMapping("/exGifts")
    public int exchangeGifts(@RequestParam int account_id, @RequestParam int gift_id, @RequestParam int quantity){
        return loginService.exchangeGifts(account_id, gift_id, quantity);
    }
}
