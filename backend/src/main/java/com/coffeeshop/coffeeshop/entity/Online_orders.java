package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.*;

import java.util.List;


@Entity(name="Online_orders")
public class Online_orders {
    @Id
    @Column(name = "id")
    private int id;
    @OneToOne
    @MapsId
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    private Orders orders;
    @Column(name="delivery_address",nullable = false, length = 255)
    private String delivery_address;
    @Column(name="delivery_charges",nullable = false)
    private int delivery_charges = 0;
    @ManyToOne
    @JoinColumn(name = "account_id", foreignKey = @ForeignKey(name = "account_order_fk"))
    private Accounts account;
@OneToMany(mappedBy = "online_orders")
private List<Delivery>deliveryList;

    public List<Delivery> getDeliveryList() {
        return deliveryList;
    }

    public void setDeliveryList(List<Delivery> deliveryList) {
        this.deliveryList = deliveryList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Orders getOrders() {
        return orders;
    }

    public void setOrders(Orders orders) {
        this.orders = orders;
    }

    public String getDelivery_address() {
        return delivery_address;
    }

    public void setDelivery_address(String delivery_address) {
        this.delivery_address = delivery_address;
    }

    public int getDelivery_charges() {
        return delivery_charges;
    }

    public void setDelivery_charges(int delivery_charges) {
        this.delivery_charges = delivery_charges;
    }

    public Accounts getAccount() {
        return account;
    }

    public void setAccount(Accounts account) {
        this.account = account;
    }
}
