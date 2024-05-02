package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity(name="Ingredients")
public class Ingredients {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "type")
    private String type;
    @Column(name="price")
    private int price ;
    @Column(name = "state")
    private String state;
    @Column(name = "description")
    private String description;
    @Column(name="quantity")
    private int quantity ;
    @OneToMany(mappedBy = "ingredients")
    private List<Product_details> product_detailsList;

    public List<Product_details> getProduct_detailsList() {
        return product_detailsList;
    }

    public void setProduct_detailsList(List<Product_details> product_detailsList) {
        this.product_detailsList = product_detailsList;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }




}
