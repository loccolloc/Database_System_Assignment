package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name="Accounts")
@Data
public class Accounts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @Column(name ="display_name" )
    private String display_name;
    @Column(name="role")
    private String role;
    @Column(name="point")
    private int point = 0;
    @OneToOne(mappedBy = "account")
    private Customers customersList;
    @OneToMany(mappedBy = "account")
    private List<Online_orders>online_ordersList;
    @OneToMany(mappedBy = "accounts")
    private List<Exchange_gifts>exchange_giftsList;
}
