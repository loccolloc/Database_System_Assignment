package com.coffeeshop.coffeeshop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDTO {
    private int order_id;
    private int product_id;
    private int quantity;
    private int cost;
    private String product_name;
    private String image;
}
