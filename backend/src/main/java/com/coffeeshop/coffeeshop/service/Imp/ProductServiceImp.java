package com.coffeeshop.coffeeshop.service.Imp;

import com.coffeeshop.coffeeshop.entity.Gifts;
import com.coffeeshop.coffeeshop.entity.Products;
import com.coffeeshop.coffeeshop.repository.ProductRepository;
import com.coffeeshop.coffeeshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImp implements ProductService {
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Products> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Gifts> availableGift(String username) {
        return productRepository.availableGift(username);
    }

    @Override
    public int exchangeGifts(int id, int quantity, int price) {
        return productRepository.exGifts(id, quantity, price);
    }

    @Override
    public Products getProductById(int id) {
        if (productRepository.findById(id).isPresent()) {
            return productRepository.findById(id).get();
        } else return null;
    }

    @Override
    public int postProduct(Products product) {
        try {
            productRepository.save(product);
            return product.getId();
        } catch (Exception e) {
            // db constraint violation
            return -1;
        }
    }

    @Override
    public int deleteProduct(int id) {
        if (productRepository.findById(id).isPresent()) {
            productRepository.deleteById(id);
            return 0;
        } else return -1;
    }
}
