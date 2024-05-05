package com.coffeeshop.coffeeshop.service.Imp;

import com.coffeeshop.coffeeshop.dto.GiftDTO;
import com.coffeeshop.coffeeshop.entity.Gifts;
import com.coffeeshop.coffeeshop.repository.GiftRepository;
import com.coffeeshop.coffeeshop.service.GiftService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
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

    @Override
    @Transactional
    public int putGift(GiftDTO giftDTO) {
        if (giftRepository.findAllByName(giftDTO.getName()).size() == 1) {
            Gifts gift = giftRepository.findAllByName(giftDTO.getName()).getFirst();
            gift.setPoint(giftDTO.getPoint());
            gift.setQuantity(giftDTO.getQuantity());
            return 0;
        } else {
            return -1;
        }
    }

    @Override
    @Transactional
    public int putImage(String name, String image) {
        if (giftRepository.findAllByName(name).size() == 1) {
            Gifts gift = giftRepository.findAllByName(name).getFirst();
            gift.setImage(Base64.getDecoder().decode(image));
            return 0;
        } else {
            return -1;
        }
    }
}
