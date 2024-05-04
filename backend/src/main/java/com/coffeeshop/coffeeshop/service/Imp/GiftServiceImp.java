package com.coffeeshop.coffeeshop.service.Imp;

import com.coffeeshop.coffeeshop.entity.Gifts;
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

    @Override
    public Gifts getGiftById(int id) {
        if (giftRepository.findById(id).isPresent()) {
            return giftRepository.findById(id).get();
        } else {
            return null;
        }
    }

    @Override
    public int postGift(Gifts gift) {
        try {
            giftRepository.save(gift);
            return gift.getId();
        } catch (Exception e) {
            // db constraint violation
            return -1;
        }
    }

    @Override
    public int deleteGift(int id) {
        if (giftRepository.findById(id).isPresent()) {
            giftRepository.deleteById(id);
            return 0;
        } else {
            return -1;
        }
    }
}
