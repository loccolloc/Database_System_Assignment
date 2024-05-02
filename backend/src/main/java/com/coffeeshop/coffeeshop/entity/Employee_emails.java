package com.coffeeshop.coffeeshop.entity;
import jakarta.persistence.*;

@Entity(name="Employee_emails")

public class Employee_emails {
    @Id
    @Column(name = "id")
    private int id;

    @Id
    @Column(name = "email")
    private String email;
    @ManyToOne
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    private Employees employee;  // Link to Employees using the ID part of the primary key

    public Employees getEmployee() {
        return employee;
    }

    public void setEmployee(Employees employee) {
        this.employee = employee;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }



}
