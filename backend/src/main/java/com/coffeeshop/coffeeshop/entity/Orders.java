package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.util.List;


@Entity(name = "Orders")
@Data
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "start_time")
    private Date start_time;
    @Column(name = "end_time")
    private Date end_time;
    @Column(name = "total_cost")
    private int total_cost;
    @Column(name = "total_quantity")
    private int total_quantity;
    @Column(name = "state", length = 6)
    private String state = "process";
    @Column(name = "type", length = 7, nullable = false)
    private String type;
    @ManyToOne
    @JoinColumn(name = "employee_id", nullable = false, foreignKey = @ForeignKey(name = "employee_order_fk"))
    private Employees employee;

    @OneToOne(mappedBy = "orders")
    @PrimaryKeyJoinColumn
    private Online_orders online_orders;
    @OneToOne(mappedBy = "order")
    @PrimaryKeyJoinColumn
    private Offline_orders offline_orders;

    @OneToMany(mappedBy = "orders")
    private List<Redeem_vouchers> redeem_vouchersList;
    @OneToMany(mappedBy = "orders")
    private List<Order_details> order_detailsList;

    /*@ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false, foreignKey = @ForeignKey(name = "customer_order_fk"))
    private Customers customer;*/
}
