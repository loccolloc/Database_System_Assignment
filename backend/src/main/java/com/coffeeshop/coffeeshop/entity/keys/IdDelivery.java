package com.coffeeshop.coffeeshop.entity.keys;

import jakarta.persistence.Column;

import java.io.Serializable;

public class IdDelivery implements Serializable {
    @Column(name="driver_id")
    private int driver_id;
    @Column(name="order_id")
    private int order_id;
    public IdDelivery(int driver_id, int order_id){
        this.driver_id = driver_id;
        this.order_id = order_id;
    }

    public int getDriver_id() {
        return driver_id;
    }

    public void setDriver_id(int driver_id) {
        this.driver_id = driver_id;
    }

    public int getOrder_id() {
        return order_id;
    }

    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }
}
