package com.coffeeshop.coffeeshop.entity;

import jakarta.persistence.*;

import java.sql.Time;
import java.util.Date;
import java.util.List;

@Entity(name="Shifts")
public class Shifts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "date")
    private Date date;
    @Column(name = "start_time")
    private Time start_time; // Utilizing java.sql.Time to directly map SQL TIME

    @Column(name = "end_time")
    private Time end_time; // Utilizing java.sql.Time to directly map SQL TIME
    @OneToMany(mappedBy = "shift_id")
    private List<Register_shifts> register_shifts;

    public List<Register_shifts> getRegister_shifts() {
        return register_shifts;
    }

    public void setRegister_shifts(List<Register_shifts> register_shifts) {
        this.register_shifts = register_shifts;
    }

    public Time getStart_time() {
        return start_time;
    }

    public void setStart_time(Time start_time) {
        this.start_time = start_time;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Time getEnd_time() {
        return end_time;
    }

    public void setEnd_time(Time end_time) {
        this.end_time = end_time;
    }



}
