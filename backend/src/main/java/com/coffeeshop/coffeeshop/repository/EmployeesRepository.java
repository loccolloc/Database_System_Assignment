package com.coffeeshop.coffeeshop.repository;

import com.coffeeshop.coffeeshop.entity.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeesRepository extends JpaRepository<Employees,Integer> {

}
