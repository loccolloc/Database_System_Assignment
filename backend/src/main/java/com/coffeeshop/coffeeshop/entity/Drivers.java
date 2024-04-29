package com.coffeeshop.coffeeshop.entity;
import jakarta.persistence.*;

import java.util.List;

@Entity(name="Drivers")
public class Drivers {
     @Id
    @Column(name = "id")
    private int id;

    @Column(name = "license", unique = true, length = 25)
    private String license; // Unique constraint on the license
    @OneToMany(mappedBy = "drivers")
    private List<Delivery>deliveryList;

    public List<Delivery> getDeliveryList() {
        return deliveryList;
    }

    public void setDeliveryList(List<Delivery> deliveryList) {
        this.deliveryList = deliveryList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLicense() {
        return license;
    }

    public void setLicense(String license) {
        this.license = license;
    }

    public Employees getEmployee() {
        return employee;
    }

    public void setEmployee(Employees employee) {
        this.employee = employee;
    }

    @OneToOne
    @MapsId
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false) // Maps to Employees
    private Employees employee; // Assuming there's an Employees entity mapped to the Employees table

}
