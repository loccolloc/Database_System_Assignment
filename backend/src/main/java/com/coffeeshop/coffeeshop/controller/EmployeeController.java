package com.coffeeshop.coffeeshop.controller;

import com.coffeeshop.coffeeshop.entity.Employees;
import com.coffeeshop.coffeeshop.entity.Products;
import com.coffeeshop.coffeeshop.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/employees")
public class EmployeeController {
    @Autowired
    EmployeeService employeeService;
    @GetMapping("/getAllEmployees")
    public List<Employees> getAllEmployees(){
        return employeeService.getAllEmployees();
    }
}
