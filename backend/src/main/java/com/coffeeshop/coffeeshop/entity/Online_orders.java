package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity(name = "Online_orders")
public class Online_orders {
    @Id
    private int id;
    @OneToOne
    @MapsId
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    private Orders orders;
    @Column(name = "delivery_address", nullable = false, length = 255)
    private String delivery_address;
    @Column(name = "delivery_charges", nullable = false)
    private int delivery_charges = 0;

    @ManyToOne
    @JoinColumn(name = "account_id", foreignKey = @ForeignKey(name = "account_order_fk"))
    private Accounts account;
    @OneToMany(mappedBy = "online_orders")
    private List<Delivery> deliveryList;

}
