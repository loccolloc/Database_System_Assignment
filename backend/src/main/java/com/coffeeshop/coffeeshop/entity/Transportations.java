package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.*;

@Entity(name="Transportations")
public class Transportations {
    @Id
    @Column(name = "license_plate", nullable = false, length = 8)
    private String licensePlate;  // This field corresponds to the primary key in the table

    @Column(name = "type")
    private String type;
    @Column(name = "color")
    private String color;
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

}
