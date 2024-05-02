package com.coffeeshop.coffeeshop.entity.keys;

import jakarta.persistence.Column;

import java.io.Serializable;

public class IdTables implements Serializable {
    @Column(name="id")
    private int id;
    @Column(name="department_id")
    private int department_id;
    public IdTables(int id, int department_id){
        this.id = id;
        this.department_id = department_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getDepartment_id() {
        return department_id;
    }

    public void setDepartment_id(int department_id) {
        this.department_id = department_id;
    }
}
