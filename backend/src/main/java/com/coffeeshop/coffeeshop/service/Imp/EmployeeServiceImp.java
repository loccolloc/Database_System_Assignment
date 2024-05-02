package com.coffeeshop.coffeeshop.service.Imp;

import com.coffeeshop.coffeeshop.entity.Employees;
import com.coffeeshop.coffeeshop.repository.EmployeesRepository;
import com.coffeeshop.coffeeshop.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service

public class EmployeeServiceImp implements EmployeeService {
    @Autowired
    EmployeesRepository employeesRepository;

    @Override
    public List<Employees> getAllEmployees() {

            return employeesRepository.findAll();
    }
}
