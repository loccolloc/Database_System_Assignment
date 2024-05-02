package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity(name="Accounts")
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
    @OneToMany(mappedBy = "account")
    private List<Customers> customersList;
    @OneToMany(mappedBy = "account")
    private List<Online_orders>online_ordersList;
    @OneToMany(mappedBy = "accounts")
    private List<Exchange_gifts>exchange_giftsList;

    public List<Exchange_gifts> getExchange_giftsList() {
        return exchange_giftsList;
    }

    public void setExchange_giftsList(List<Exchange_gifts> exchange_giftsList) {
        this.exchange_giftsList = exchange_giftsList;
    }

    public List<Online_orders> getOnline_ordersList() {
        return online_ordersList;
    }

    public void setOnline_ordersList(List<Online_orders> online_ordersList) {
        this.online_ordersList = online_ordersList;
    }

    public List<Customers> getCustomersList() {
        return customersList;
    }

    public void setCustomersList(List<Customers> customersList) {
        this.customersList = customersList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDisplay_name() {
        return display_name;
    }

    public void setDisplay_name(String display_name) {
        this.display_name = display_name;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getPoint() {
        return point;
    }

    public void setPoint(int point) {
        this.point = point;
    }
}
