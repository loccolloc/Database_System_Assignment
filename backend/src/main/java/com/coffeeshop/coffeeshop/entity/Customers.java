package com.coffeeshop.coffeeshop.entity;
import jakarta.persistence.*;

import java.util.List;

@Entity(name="Customers")
public class Customers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "account_id", nullable = false)
    private int account_id;

    @Column(name = "last_name", length = 50)
    private String last_name;

    @Column(name = "first_name", length = 25)
    private String first_name;

    @Column(name = "gender", length = 6)
    private String gender;

    @Column(name = "locations", length = 255)
    private String locations;
    @Column(name = "phone_number", length = 10)
    private String phone_number;

    @ManyToOne
    @JoinColumn(name = "account_id", insertable = false, updatable = false)
    private Accounts account;
    @OneToMany(mappedBy = "customers")
    private List<Vouchers>vouchersList;
    @OneToMany(mappedBy = "customer")
    private List<Orders> ordersList;
    @OneToMany(mappedBy = "customer")
    private List<Offline_orders>offline_ordersList;
    @OneToMany(mappedBy = "customers")
    private List<Reviews>reviewsList;

    public List<Reviews> getReviewsList() {
        return reviewsList;
    }

    public void setReviewsList(List<Reviews> reviewsList) {
        this.reviewsList = reviewsList;
    }

    public List<Offline_orders> getOffline_ordersList() {
        return offline_ordersList;
    }

    public void setOffline_ordersList(List<Offline_orders> offline_ordersList) {
        this.offline_ordersList = offline_ordersList;
    }

    public List<Orders> getOrdersList() {
        return ordersList;
    }

    public void setOrdersList(List<Orders> ordersList) {
        this.ordersList = ordersList;
    }

    public List<Vouchers> getVouchersList() {
        return vouchersList;
    }

    public void setVouchersList(List<Vouchers> vouchersList) {
        this.vouchersList = vouchersList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAccount_id() {
        return account_id;
    }

    public void setAccount_id(int account_id) {
        this.account_id = account_id;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getLocations() {
        return locations;
    }

    public void setLocations(String locations) {
        this.locations = locations;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public Accounts getAccount() {
        return account;
    }

    public void setAccount(Accounts account) {
        this.account = account;
    }


}
