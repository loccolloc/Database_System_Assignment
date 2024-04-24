package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name="departments")
public class Departments {
    @Id
    private int id;
    private String name;
    private String email;
    private String phone_number;
    private String location;

}
