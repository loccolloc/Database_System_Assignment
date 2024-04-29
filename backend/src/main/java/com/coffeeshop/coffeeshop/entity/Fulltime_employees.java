package com.coffeeshop.coffeeshop.entity;
import jakarta.persistence.Entity;

import jakarta.persistence.*;

@Entity(name="Fulltime_employees")
public class Fulltime_employees {


    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "salary", nullable = false)

    private int salary;
    @Column(name = "salary_coefficient", nullable = false)
    private int salaryCoefficient = 1; // Default is 1
    @OneToOne
    @MapsId
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    private Employees employee;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Employees getEmployee() {
        return employee;
    }

    public void setEmployee(Employees employee) {
        this.employee = employee;
    }
    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public int getSalaryCoefficient() {
        return salaryCoefficient;
    }

    public void setSalaryCoefficient(int salaryCoefficient) {
        this.salaryCoefficient = salaryCoefficient;
    }



}
