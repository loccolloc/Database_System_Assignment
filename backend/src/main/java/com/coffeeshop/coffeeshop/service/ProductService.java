package com.coffeeshop.coffeeshop.service;

import com.coffeeshop.coffeeshop.dto.ProductDTO;
import com.coffeeshop.coffeeshop.entity.Products;

import java.util.List;

public interface ProductService {
    List<Products> getAllProducts();

    Products getProductById(int id);

    int postProduct(Products product);

    int deleteProduct(int id);

    List<Products> getAllProductsByType(String type);

    List<Products> getAllProductsByName(String name);

    int putProduct(ProductDTO productDTO);

    int putImage(String name, String image);

    List<Products> getAllProductsByPriceAsc();

    List<Products> getAllProductsByPriceDesc();
}
