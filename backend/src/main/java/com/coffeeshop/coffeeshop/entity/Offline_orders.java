package com.coffeeshop.coffeeshop.entity;
import jakarta.persistence.*;

@Entity(name="Offline_orders")

public class Offline_orders {
    @Id
    @Column(name = "id")
    private int id;
    @Column(name="request",length = 255)
    private String request;
    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customers customer;
    @OneToOne
    @MapsId
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    private Orders order;
    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "table_id", referencedColumnName = "id"),
            @JoinColumn(name = "department_id", referencedColumnName = "department_id")
    })
    private Tables table;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public Customers getCustomer() {
        return customer;
    }

    public void setCustomer(Customers customer) {
        this.customer = customer;
    }

    public Orders getOrder() {
        return order;
    }

    public void setOrder(Orders order) {
        this.order = order;
    }

    public Tables getTable() {
        return table;
    }

    public void setTable(Tables table) {
        this.table = table;
    }
}
