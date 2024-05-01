package com.coffeeshop.coffeeshop.service.Imp;

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
}
