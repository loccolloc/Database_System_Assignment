package com.coffeeshop.coffeeshop.controller;

import com.coffeeshop.coffeeshop.entity.Gifts;
import com.coffeeshop.coffeeshop.service.GiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/gifts")
public class GiftController {
    @Autowired
    GiftService giftService;

    @GetMapping("/all")
    public List<Gifts> getAllProducts() {
        return giftService.getAllGifts();
    }

    @GetMapping("/get/{id}")
    public Gifts getGiftById(@PathVariable int id) {
        return giftService.getGiftById(id);
    }

    @PostMapping("/post")
    public int postGift(@RequestBody Gifts gift) {
        return giftService.postGift(gift);
    }

    @DeleteMapping("/delete/{id}")
    public int deleteGift(@PathVariable int id) {
        return giftService.deleteGift(id);
    }

}

