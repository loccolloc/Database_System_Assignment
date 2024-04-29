package com.coffeeshop.coffeeshop.entity.keys;

import jakarta.persistence.Column;

import java.io.Serializable;

public class IdExchange_gifts implements Serializable {
    @Column(name="account_id")
    private int account_id;
    @Column(name="gift_id")
    private int gift_id;
    public IdExchange_gifts(int account_id, int gift_id){
        this.account_id = account_id;
        this.gift_id = gift_id;
    }

    public int getAccount_id() {
        return account_id;
    }

    public void setAccount_id(int account_id) {
        this.account_id = account_id;
    }

    public int getGift_id() {
        return gift_id;
    }

    public void setGift_id(int gift_id) {
        this.gift_id = gift_id;
    }
}
