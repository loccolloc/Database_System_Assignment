package com.coffeeshop.coffeeshop.entity.keys;

import jakarta.persistence.Column;

import java.io.Serializable;

public class IdReviews implements Serializable {
    @Column(name="customer_id")
    private int customer_id;
    @Column(name="product_id")
    private int product_id;
    public IdReviews(int customer_id, int product_id){
        this.customer_id = customer_id;
        this.product_id = product_id;
    }

    public int getCustomer_id() {
        return customer_id;
    }

    public void setCustomer_id(int customer_id) {
        this.customer_id = customer_id;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }
}
