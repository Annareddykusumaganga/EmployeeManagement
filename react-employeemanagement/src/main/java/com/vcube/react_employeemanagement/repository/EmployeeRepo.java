package com.vcube.react_employeemanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vcube.react_employeemanagement.entity.EmployeeManagement;

public interface EmployeeRepo extends JpaRepository<EmployeeManagement,Integer> {

}
