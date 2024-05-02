package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity(name="Gifts")
public class Gifts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name")

    private String name;
    @Lob
    @Column(name="image")
    private byte[] image;
    @Column(name="quantity")
    private int quantity ;
    @Column(name="point")
    private int point ;
    @OneToMany(mappedBy = "gifts")
    private List<Exchange_gifts>exchange_giftsList;

    public List<Exchange_gifts> getExchange_giftsList() {
        return exchange_giftsList;
    }

    public void setExchange_giftsList(List<Exchange_gifts> exchange_giftsList) {
        this.exchange_giftsList = exchange_giftsList;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPoint() {
        return point;
    }

    public void setPoint(int point) {
        this.point = point;
    }




}
