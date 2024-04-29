package com.coffeeshop.coffeeshop.entity;
import com.coffeeshop.coffeeshop.entity.keys.IdDelivery;
import com.coffeeshop.coffeeshop.entity.keys.IdRedeem_vouchers;
import jakarta.persistence.*;

import java.util.Date;


@Entity(name="Delivery")
@IdClass(IdDelivery.class)
public class Delivery {
    @Id
    private int driver_id;


    @Id
    private int order_id;

    @ManyToOne
    @JoinColumn(name = "driver_id", insertable = false, updatable = false)
    private Drivers drivers;


    @ManyToOne
    @JoinColumn(name = "order_id", insertable = false, updatable = false)
    private Online_orders online_orders;

    @Column(name = "license_plate", nullable = false, length = 8)
    private String license_plate;

    @Column(name = "delivery_time")
    private Date delivery_time;

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

    public Drivers getDrivers() {
        return drivers;
    }

    public void setDrivers(Drivers drivers) {
        this.drivers = drivers;
    }

    public Online_orders getOnline_orders() {
        return online_orders;
    }

    public void setOnline_orders(Online_orders online_orders) {
        this.online_orders = online_orders;
    }

    public String getLicense_plate() {
        return license_plate;
    }

    public void setLicense_plate(String license_plate) {
        this.license_plate = license_plate;
    }

    public Date getDelivery_time() {
        return delivery_time;
    }

    public void setDelivery_time(Date delivery_time) {
        this.delivery_time = delivery_time;
    }
}
