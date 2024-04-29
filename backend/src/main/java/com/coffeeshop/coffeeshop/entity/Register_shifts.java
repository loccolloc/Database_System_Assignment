package com.coffeeshop.coffeeshop.entity;
import com.coffeeshop.coffeeshop.entity.keys.IdRegister_shifts;
import jakarta.persistence.*;

@Entity(name="Register_shifts")
@IdClass(IdRegister_shifts.class)
public class Register_shifts {
    @Id
    private int employee_id;


    @Id
    private int shift_id;


    @ManyToOne
    @JoinColumn(name = "employee_id", insertable = false, updatable = false)
    private Employees employee;


    @ManyToOne
    @JoinColumn(name = "shift_id", insertable = false, updatable = false)
    private Shifts shift;
    public int getShift_id() {
        return shift_id;
    }

    public void setShift_id(int shift_id) {
        this.shift_id = shift_id;
    }

    public int getEmployee_id() {
        return employee_id;
    }

    public void setEmployee_id(int employee_id) {
        this.employee_id = employee_id;
    }

    public Employees getEmployee() {
        return employee;
    }

    public void setEmployee(Employees employee) {
        this.employee = employee;
    }

    public Shifts getShift() {
        return shift;
    }

    public void setShift(Shifts shift) {
        this.shift = shift;
    }



}
