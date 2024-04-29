package com.coffeeshop.coffeeshop.entity.keys;

import jakarta.persistence.Column;

import java.io.Serializable;

public class IdRegister_shifts implements Serializable {
    @Column(name="employee_id")
    private int employee_id;
    @Column(name="shift_id")
    private int shift_id;
    public IdRegister_shifts(int employee_id, int shift_id){
    this.employee_id = employee_id;
    this.shift_id = shift_id;
    }

    public int getEmployee_id() {
        return employee_id;
    }

    public void setEmployee_id(int employee_id) {
        this.employee_id = employee_id;
    }

    public int getShift_id() {
        return shift_id;
    }

    public void setShift_id(int shift_id) {
        this.shift_id = shift_id;
    }
}
