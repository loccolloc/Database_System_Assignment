package com.coffeeshop.coffeeshop.mapper;

import com.coffeeshop.coffeeshop.dto.ProductDTO;
import com.coffeeshop.coffeeshop.entity.Products;

import java.math.BigDecimal;
import java.util.Base64;

public class Mapper {
    public static Products toEntity(ProductDTO productDTO) {
        Products product = new Products();
        product.setName(productDTO.getName());
        product.setDiscount(BigDecimal.valueOf(productDTO.getDiscount()));
        product.setList_price(productDTO.getList_price());
        product.setState(productDTO.getState());
        product.setType(productDTO.getType());
        product.setImage(Base64.getDecoder().decode(productDTO.getImage()));
        product.setRating(BigDecimal.valueOf(productDTO.getRating()));
        return product;
    }

    public static ProductDTO toDTO(Products product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setName(product.getName());
        productDTO.setDiscount(product.getDiscount().doubleValue());
        productDTO.setList_price(product.getList_price());
        productDTO.setState(product.getState());
        productDTO.setType(product.getType());
        productDTO.setImage(Base64.getEncoder().encodeToString(product.getImage()));
        productDTO.setRating(product.getRating().doubleValue());
        return productDTO;
    }
}
