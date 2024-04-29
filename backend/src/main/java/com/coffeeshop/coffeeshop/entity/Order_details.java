package com.coffeeshop.coffeeshop.entity;
import com.coffeeshop.coffeeshop.entity.keys.IdOrder_details;
import com.coffeeshop.coffeeshop.entity.keys.IdRedeem_vouchers;
import jakarta.persistence.*;




@Entity(name="Order_details")
@IdClass(IdOrder_details.class)
public class Order_details {
    @Column(name = "quantity")
    private int quantity;
    @Column(name = "cost")
    private int cost;
    @Id
    private int order_id;


    @Id
    private int product_id;
    @ManyToOne
    @JoinColumn(name = "order_id", insertable = false, updatable = false)
    private Orders orders;


    @ManyToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Products products;

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getCost() {
        return cost;
    }

    public void setCost(int cost) {
        this.cost = cost;
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

    public Orders getOrders() {
        return orders;
    }

    public void setOrders(Orders orders) {
        this.orders = orders;
    }

    public Products getProducts() {
        return products;
    }

    public void setProducts(Products products) {
        this.products = products;
    }
}
