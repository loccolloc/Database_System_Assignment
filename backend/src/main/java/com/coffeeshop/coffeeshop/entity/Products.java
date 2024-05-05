package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Base64;

@Data
@Entity(name="Products")
@NoArgsConstructor
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

    Products(String name, String type, int list_price, double discount, String state, String image){
        this.name = name;
        this.type = type;
        this.list_price = list_price;
        this.discount = new BigDecimal(discount);
        this.state = state;
        this.image = Base64.getDecoder().decode(image);

    }

}
