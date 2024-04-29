package com.coffeeshop.coffeeshop.entity;
import jakarta.persistence.*;

@Entity(name="Parttime_employees")
public class Parttime_employees {
    @Id
    @Column(name = "id")
    private int id;
    @Column(name = "hourly_pay", nullable = false)
    private int hourlyPay;

    @Column(name = "working_hour", nullable = false)
    private int workingHour;
    @OneToOne
    @MapsId
    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
    private Employees employee;


    public Employees getEmployee() {
        return employee;
    }

    public void setEmployee(Employees employee) {
        this.employee = employee;
    }

    public int getWorkingHour() {
        return workingHour;
    }

    public void setWorkingHour(int workingHour) {
        this.workingHour = workingHour;
    }

    public int getHourlyPay() {
        return hourlyPay;
    }

    public void setHourlyPay(int hourlyPay) {
        this.hourlyPay = hourlyPay;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }



}
