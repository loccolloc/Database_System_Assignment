package com.coffeeshop.coffeeshop.entity;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity(name="Employees")
public class Employees {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "last_name")
    private String last_name;
    @Column(name = "first_name")
    private String first_name;
    @Column(name = "gender")
    private String email;
    @Column(name = "email")
    private String gender;
    @Column(name = "location")
    private String location;

    @Column(name = "position")
    private String position;
    @Column(name = "start_date")
    private Date start_date;
    @Column(name = "cccd", unique = true, length = 12)
    private String cccd;
    @Column(name = "birthday")
    private Date birthday;

    @OneToOne(mappedBy = "employee")
    @PrimaryKeyJoinColumn
    private Parttime_employees Parttime_employees;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "super_id")
    private Employees supervisor;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Departments department;



    @OneToOne(mappedBy = "employee")
    @PrimaryKeyJoinColumn
    private Fulltime_employees Fulltime_employees;

    @OneToOne(mappedBy = "employee")
    @PrimaryKeyJoinColumn
    private Drivers Drivers;

    @OneToMany(mappedBy = "employee")
    private List<Register_shifts> register_shifts;
    @OneToMany(mappedBy = "employee")
    private List<Orders>ordersList;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public com.coffeeshop.coffeeshop.entity.Drivers getDrivers() {
        return Drivers;
    }

    public void setDrivers(com.coffeeshop.coffeeshop.entity.Drivers drivers) {
        Drivers = drivers;
    }

    public List<Orders> getOrdersList() {
        return ordersList;
    }

    public void setOrdersList(List<Orders> ordersList) {
        this.ordersList = ordersList;
    }

    public List<Register_shifts> getRegister_shifts() {
        return register_shifts;
    }

    public void setRegister_shifts(List<Register_shifts> register_shifts) {
        this.register_shifts = register_shifts;
    }

    public com.coffeeshop.coffeeshop.entity.Fulltime_employees getFulltime_employees() {
        return Fulltime_employees;
    }

    public void setFulltime_employees(com.coffeeshop.coffeeshop.entity.Fulltime_employees fulltime_employees) {
        Fulltime_employees = fulltime_employees;
    }
    public com.coffeeshop.coffeeshop.entity.Parttime_employees getParttime_employees() {
        return Parttime_employees;
    }

    public void setParttime_employees(com.coffeeshop.coffeeshop.entity.Parttime_employees parttime_employees) {
        Parttime_employees = parttime_employees;
    }
    public Departments getDepartment() {
        return department;
    }

    public void setDepartment(Departments department) {
        this.department = department;
    }

    public Employees getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(Employees supervisor) {
        this.supervisor = supervisor;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getCccd() {
        return cccd;
    }

    public void setCccd(String cccd) {
        this.cccd = cccd;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }






}
