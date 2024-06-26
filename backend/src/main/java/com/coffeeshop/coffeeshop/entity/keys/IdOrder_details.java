package com.coffeeshop.coffeeshop.entity.keys;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IdOrder_details implements Serializable {
    @Column(name="order_id")
    private int orderId;
    @Column(name="product_id")
    private int productId;

}
