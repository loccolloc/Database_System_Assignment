package com.coffeeshop.coffeeshop.entity;


import com.coffeeshop.coffeeshop.entity.keys.IdReviews;
import jakarta.persistence.*;




@Entity(name="Reviews")
@IdClass(IdReviews.class)
public class Reviews {
    @Column(name="comment")
    private String comment;
    @Column(name="score")
    private int score=5;
    @Id
    private int customer_id;


    @Id
    private int product_id;

    @ManyToOne
    @JoinColumn(name = "customer_id", insertable = false, updatable = false)
    private Customers customers;


    @ManyToOne
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Products products;

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
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

    public Customers getCustomers() {
        return customers;
    }

    public void setCustomers(Customers customers) {
        this.customers = customers;
    }

    public Products getProducts() {
        return products;
    }

    public void setProducts(Products products) {
        this.products = products;
    }
}
