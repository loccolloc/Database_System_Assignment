package com.coffeeshop.coffeeshop.controller;

import com.coffeeshop.coffeeshop.entity.Gifts;
import com.coffeeshop.coffeeshop.entity.Products;
import com.coffeeshop.coffeeshop.payload.ResponseData;
import com.coffeeshop.coffeeshop.service.GiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/gifts")
public class GiftController {
    @Autowired
    GiftService giftService;

    @GetMapping("/getAllGifts")
    public List<Gifts> getAllProducts() {
        return giftService.getAllGifts();
    }

}

