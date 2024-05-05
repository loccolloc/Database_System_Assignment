package com.coffeeshop.coffeeshop.service;

import com.coffeeshop.coffeeshop.dto.GiftDTO;
import com.coffeeshop.coffeeshop.entity.Gifts;

import java.util.List;

public interface GiftService {
    List<Gifts> getAllGifts();

    Gifts getGiftById(int id);

    int postGift(Gifts gift);

    int deleteGift(int id);

    int putGift(GiftDTO gift);

    int putImage(String name, String image);
}
