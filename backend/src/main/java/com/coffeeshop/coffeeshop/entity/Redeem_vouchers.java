package com.coffeeshop.coffeeshop.entity;
import com.coffeeshop.coffeeshop.entity.keys.IdRedeem_vouchers;

import jakarta.persistence.*;




@Entity(name="Redeem_vouchers")
@IdClass(IdRedeem_vouchers.class)
public class Redeem_vouchers {
    @Id
    private int order_id;


    @Id
    private int voucher_id;

    @ManyToOne
    @JoinColumn(name = "order_id", insertable = false, updatable = false)
    private Orders orders;


    @ManyToOne
    @JoinColumn(name = "voucher_id", insertable = false, updatable = false)
    private Vouchers vouchers;

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

    public Orders getOrders() {
        return orders;
    }

    public void setOrders(Orders orders) {
        this.orders = orders;
    }

    public Vouchers getVouchers() {
        return vouchers;
    }

    public void setVouchers(Vouchers vouchers) {
        this.vouchers = vouchers;
    }
}
