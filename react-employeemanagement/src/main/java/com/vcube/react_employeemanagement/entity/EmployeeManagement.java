package com.vcube.react_employeemanagement.entity;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeManagement {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private int empid;
	private String empname;
	private String emailid;
	private Integer age;
	private String designation;
	private Double salary;
}
