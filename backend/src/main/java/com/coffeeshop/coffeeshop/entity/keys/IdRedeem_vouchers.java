package com.coffeeshop.coffeeshop.entity.keys;

import jakarta.persistence.Column;

import java.io.Serializable;

public class IdRedeem_vouchers implements Serializable {
    @Column(name="order_id")
    private int order_id;
    @Column(name="voucher_id")
    private int voucher_id;
    public IdRedeem_vouchers(int order_id, int voucher_id){
        this.order_id = order_id;
        this.voucher_id = voucher_id;
    }

    public int getOrder_id() {
        return order_id;
    }

    public void setOrder_id(int order_id) {
        this.order_id = order_id;
    }

    public int getVoucher_id() {
        return voucher_id;
    }

    public void setVoucher_id(int voucher_id) {
        this.voucher_id = voucher_id;
    }
}
