package com.coffeeshop.coffeeshop.entity.keys;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IdReviews implements Serializable {
    @Column(name="customer_id")
    private int customerId;
    @Column(name="product_id")
    private int productId;
}
