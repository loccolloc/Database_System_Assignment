package com.coffeeshop.coffeeshop.entity.keys;

import jakarta.persistence.Column;

import java.io.Serializable;

public class IdOrder_details implements Serializable {
    @Column(name="order_id")
    private int order_id;
    @Column(name="product_id")
    private int product_id;
    public IdOrder_details(int order_id, int product_id){
        this.order_id = order_id;
        this.product_id = product_id;
    }

    public int getOrder_id() {
        return order_id;
    }

    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }

    public int getProduct_id() {
        return product_id;
    }

    public void setProduct_id(int product_id) {
        this.product_id = product_id;
    }
}
