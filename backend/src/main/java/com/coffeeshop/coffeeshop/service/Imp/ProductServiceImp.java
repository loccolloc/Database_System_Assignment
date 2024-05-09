package com.coffeeshop.coffeeshop.service.Imp;

import com.coffeeshop.coffeeshop.dto.ProductDTO;
import com.coffeeshop.coffeeshop.entity.Products;
import com.coffeeshop.coffeeshop.repository.ProductRepository;
import com.coffeeshop.coffeeshop.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
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

    @Override
    public List<Products> getAllProductsByType(String type) {
        return productRepository.findAllByType(type);
    }

    @Override
    public List<Products> getAllProductsByName(String name) {
        return productRepository.findAllByName(name);
    }

    @Override
    @Transactional
    public int putProduct(ProductDTO productDTO) {
        List<Products> products = productRepository.findAllByName(productDTO.getName());
        if (products.size() == 1) {
            Products product = products.getFirst();
            product.setType(productDTO.getType());
            product.setListPrice(productDTO.getList_price());
            product.setDiscount(BigDecimal.valueOf(productDTO.getDiscount()));
            product.setState(productDTO.getState());
            if (productDTO.getImage() != null)
                product.setImage(Base64.getDecoder().decode(productDTO.getImage()));
            return 0;
        } else return -1;
    }

    @Override
    @Transactional
    public int putImage(String name, String image) {
        List<Products> products = productRepository.findAllByName(name);
        if (products.size() == 1) {
            Products product = products.getFirst();
            product.setImage(Base64.getDecoder().decode(image));
            return 0;
        } else return -1;
    }

    @Override
    public List<Products> getAllProductsByPriceAsc() {
        return productRepository.findAll(Sort.by("listPrice"));
    }

    @Override
    public List<Products> getAllProductsByPriceDesc() {
        return productRepository.findAll(Sort.by("listPrice").descending());
    }

    @Override
    public String classifyProducts(int id) {
        return productRepository.classifyProducts(id);
    }

    @Override
    public int calculateTotalProfitByDate(String start_date, String end_date) {
        return productRepository.calculateTotalProfitByDate(
                Timestamp.valueOf(LocalDateTime.parse(start_date, DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss"))),
                Timestamp.valueOf(LocalDateTime.parse(end_date, DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss")))
        );
    }
}
