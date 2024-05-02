package com.coffeeshop.coffeeshop.entity;

import com.coffeeshop.coffeeshop.entity.keys.IdTables;
import jakarta.persistence.*;

import java.util.List;

@Entity(name="Tables")
@IdClass(IdTables.class)
public class Tables {
    @Id
    private int id;
    @Id
    private int department_id;
    @ManyToOne
    @JoinColumn(name = "department_id",insertable = false, updatable = false)
    private Departments departments;  // Part of the composite key and a foreign key

    @Column(name="state",length = 6)
    private String state = "active";
    @Column(name="chair_number")
    private int chair_number;
    @Column(name="note")
    private String note;
    @OneToMany(mappedBy = "table")
    private List<Offline_orders> offline_ordersList;

    public List<Offline_orders> getOffline_ordersList() {
        return offline_ordersList;
    }

    public void setOffline_ordersList(List<Offline_orders> offline_ordersList) {
        this.offline_ordersList = offline_ordersList;
    }

    public int getDepartment_id() {
        return department_id;
    }

    public void setDepartment_id(int department_id) {
        this.department_id = department_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Departments getDepartments() {
        return departments;
    }

    public void setDepartments(Departments departments) {
        this.departments = departments;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getChair_number() {
        return chair_number;
    }

    public void setChair_number(int chair_number) {
        this.chair_number = chair_number;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
