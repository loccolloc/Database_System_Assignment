package com.coffeeshop.coffeeshop.service;

import com.coffeeshop.coffeeshop.entity.Gifts;
import com.coffeeshop.coffeeshop.entity.Products;

import java.util.List;

public interface ProductService {
    List<Products> getAllProducts();

    List<Gifts> availableGift(String username);

    int exchangeGifts(int id, int quantity, int price);

    Products getProductById(int id);

    int postProduct(Products product);

    int deleteProduct(int id);
}
