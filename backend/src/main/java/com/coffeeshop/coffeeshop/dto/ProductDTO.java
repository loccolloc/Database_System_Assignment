package com.coffeeshop.coffeeshop.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private String name;
    private String type;
    private int list_price;
    private double discount;
    private String state;
    private String image;
    private double rating;
}
