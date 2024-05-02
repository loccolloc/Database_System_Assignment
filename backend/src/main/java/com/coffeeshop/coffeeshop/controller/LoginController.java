package com.coffeeshop.coffeeshop.controller;

import com.coffeeshop.coffeeshop.entity.Accounts;
import com.coffeeshop.coffeeshop.payload.ResponseData;
import com.coffeeshop.coffeeshop.payload.request.SignUpRequest;
import com.coffeeshop.coffeeshop.repository.AccountsRepository;
import com.coffeeshop.coffeeshop.service.Imp.LoginServiceImp;
import com.coffeeshop.coffeeshop.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    LoginServiceImp loginServiceImp;
    @Autowired
    AccountsRepository accountsRepository;
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestParam String username, @RequestParam String password){
        ResponseData responseData=new ResponseData();
        if(loginServiceImp.checkLogin(username, password)){
            responseData.setData(true);
            List<Accounts> accountsList=accountsRepository.findByUsernameAndPassword(username,password);
            for(Accounts accounts:accountsList){
                responseData.setType(accounts.getType());

            }

       }else{

            responseData.setData(false);
        }
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUpRequest signUpRequest){
        ResponseData responseData=new ResponseData();
         responseData.setData(loginServiceImp.addAccount(signUpRequest));

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
}