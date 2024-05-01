package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity(name="Products")
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="name")
    private String name;
    @Column(name="type")

    private String type;
    @Column(name="list_price",nullable = false)
    private int list_price;
    @Column(name="discount",precision = 3, scale = 2)
    private BigDecimal discount = BigDecimal.ZERO;
    @Column(name="state")
    private String state;

    @Lob
    @Column(name="image")
    private byte[] image;

    @Column(name="rating",precision = 3, scale = 2)
    private BigDecimal rating;
}
