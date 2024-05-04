package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Base64;
import java.util.List;

@Data
@NoArgsConstructor
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

    public Gifts(String name, int quantity, int point, String image) {
        this.name = name;
        this.image = Base64.getDecoder().decode(image);
        this.quantity = quantity;
        this.point = point;
    }
}
