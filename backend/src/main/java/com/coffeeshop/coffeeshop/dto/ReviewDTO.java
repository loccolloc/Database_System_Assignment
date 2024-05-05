package com.coffeeshop.coffeeshop.dto;

import lombok.Data;

@Data
public class ReviewDTO {
    private String comment;
    private int score;
    private int customer_id;
    private int product_id;
}
