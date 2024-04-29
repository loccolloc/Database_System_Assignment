package com.coffeeshop.coffeeshop.entity;


import jakarta.persistence.*;

import java.util.List;

@Entity(name="Departments")
public class Departments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "name", nullable = false, length = 50)

    private String name;
    @Column(name = "email", length = 255)

    private String email;
    @Column(name = "phone_number", length = 11)

    private String phone_number;
    @Column(name = "location", length = 255)
    private String location;
    @Lob
    @Column(name = "image", columnDefinition = "VARBINARY(MAX)") // Using VARBINARY(MAX) for the SQL Server image type
    private byte[] image;
    @OneToMany(mappedBy = "department")
    private List<Employees>employeesList;
    @OneToMany(mappedBy = "departments")
    private List<Tables> tablesList;

    public List<Tables> getTablesList() {
        return tablesList;
    }

    public void setTablesList(List<Tables> tablesList) {
        this.tablesList = tablesList;
    }

    public List<Employees> getEmployeesList() {
        return employeesList;
    }

    public void setEmployeesList(List<Employees> employeesList) {
        this.employeesList = employeesList;
    }


    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }



}
