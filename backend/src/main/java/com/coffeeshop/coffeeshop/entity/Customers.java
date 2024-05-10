package com.coffeeshop.coffeeshop.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
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

    @OneToOne
    @JoinColumn(name = "account_id", insertable = false, updatable = false)
    private Accounts account;
    @OneToMany(mappedBy = "customers")
    private List<Vouchers>vouchersList;
    @OneToMany(mappedBy = "customer")
/*    private List<Orders> ordersList;
    @OneToMany(mappedBy = "customer")*/
    private List<Offline_orders>offline_ordersList;
    @OneToMany(mappedBy = "customers")
    private List<Reviews>reviewsList;
    }
