package com.coffeeshop.coffeeshop.entity;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;


@Entity(name="Orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="startTime")
    private Date startTime;
    @Column(name="end_time")
    private Date end_time;
    @Column(name="total_cost")
    private int total_cost;
    @Column(name="total_quantity")
    private int total_quantity;
    @Column(name="state",length = 6)
    private String state = "process";
    @Column(name="type",length = 7, nullable = false)
    private String type;
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false, foreignKey = @ForeignKey(name = "customer_order_fk"))
    private Customers customer;

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
    private List<Redeem_vouchers>redeem_vouchersList;
    @OneToMany(mappedBy = "orders")
    private List<Order_details>order_detailsList;

    public List<Order_details> getOrder_detailsList() {
        return order_detailsList;
    }

    public void setOrder_detailsList(List<Order_details> order_detailsList) {
        this.order_detailsList = order_detailsList;
    }

    public List<Redeem_vouchers> getRedeem_vouchersList() {
        return redeem_vouchersList;
    }

    public void setRedeem_vouchersList(List<Redeem_vouchers> redeem_vouchersList) {
        this.redeem_vouchersList = redeem_vouchersList;
    }

    public Offline_orders getOffline_orders() {
        return offline_orders;
    }

    public void setOffline_orders(Offline_orders offline_orders) {
        this.offline_orders = offline_orders;
    }

    public Online_orders getOnline_orders() {
        return online_orders;
    }

    public void setOnline_orders(Online_orders online_orders) {
        this.online_orders = online_orders;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }

    public Date getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Date end_time) {
        this.end_time = end_time;
    }

    public int getTotal_cost() {
        return total_cost;
    }

    public void setTotal_cost(int total_cost) {
        this.total_cost = total_cost;
    }

    public int getTotal_quantity() {
        return total_quantity;
    }

    public void setTotal_quantity(int total_quantity) {
        this.total_quantity = total_quantity;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Customers getCustomer() {
        return customer;
    }

    public void setCustomer(Customers customer) {
        this.customer = customer;
    }

    public Employees getEmployee() {
        return employee;
    }

    public void setEmployee(Employees employee) {
        this.employee = employee;
    }
}
