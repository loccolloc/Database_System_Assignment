package com.coffeeshop.coffeeshop.dto;

import lombok.Data;

@Data
public class OrderDetailDTO {
    private int order_id;
    private int product_id;
    private int cost;
    private int quantity;
}
