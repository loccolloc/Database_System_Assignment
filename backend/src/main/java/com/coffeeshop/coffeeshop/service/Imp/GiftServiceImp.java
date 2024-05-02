package com.coffeeshop.coffeeshop.service.Imp;

import com.coffeeshop.coffeeshop.entity.Gifts;
import com.coffeeshop.coffeeshop.entity.Products;
import com.coffeeshop.coffeeshop.repository.GiftRepository;
import com.coffeeshop.coffeeshop.service.GiftService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class GiftServiceImp implements GiftService {
    @Autowired
    GiftRepository giftRepository;

    @Override
    public List<Gifts> getAllGifts() {
        return giftRepository.findAll();
    }
}
