package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Accounts;
import com.coffeeshop.coffeeshop.entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeesRepository extends JpaRepository<Employees,Integer> {

}
