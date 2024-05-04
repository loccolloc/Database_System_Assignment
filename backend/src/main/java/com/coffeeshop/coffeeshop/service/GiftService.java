package com.coffeeshop.coffeeshop.service;

import com.coffeeshop.coffeeshop.entity.Gifts;

import java.util.List;

public interface GiftService {
    List<Gifts> getAllGifts();

    Gifts getGiftById(int id);

    int postGift(Gifts gift);

    int deleteGift(int id);
}
