package com.vcube.react_employeemanagement.service;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


import com.vcube.react_employeemanagement.entity.EmployeeManagement;
import com.vcube.react_employeemanagement.exception.ResourceNotFoundException;
import com.vcube.react_employeemanagement.repository.EmployeeRepo;

@Service
public class EmployeeService {

	@Autowired
	private EmployeeRepo empRepo;

	public EmployeeManagement insertEmp(EmployeeManagement emp) {
		return empRepo.save(emp);
	}

	public List<EmployeeManagement> getAllEmployees() {
		return empRepo.findAll();
	}

	public EmployeeManagement getEmpById(int empid) throws ResourceNotFoundException {
		return empRepo.findById(empid).map(emp -> emp)
				.orElseThrow(() -> new ResourceNotFoundException("employee with id " + empid + " doen't exsists.."));
	}

	public void deleteEmployees() {
		empRepo.deleteAll();
	}

	public void deleteEmployeeById(int empid) throws ResourceNotFoundException {
		if (!empRepo.existsById(empid)) {
			throw new ResourceNotFoundException("Employee with id" + empid + " doesn't exist...");
		}
		empRepo.deleteById(empid);
	}

	public EmployeeManagement updateEmployee(@RequestBody EmployeeManagement emp, @PathVariable Integer empid)
			throws ResourceNotFoundException {
		EmployeeManagement employee = empRepo.findById(empid)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found with " + empid));

		employee.setEmpname(emp.getEmpname());
		employee.setAge(emp.getAge());
		employee.setDesignation(emp.getDesignation());
		employee.setEmailid(emp.getEmailid());
		employee.setSalary(emp.getSalary());

		return empRepo.save(employee);
		// return ResponseEntity.ok(updateEmployee);
	}

	public EmployeeManagement patchEmployee(EmployeeManagement emp, int empid) throws ResourceNotFoundException {
		EmployeeManagement employee = empRepo.findById(empid)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found with " + empid));

		// update only non-null fields
		if (emp.getEmpname() != null)
			employee.setEmpname(emp.getEmpname());
		if (emp.getAge() != null)
			employee.setAge(emp.getAge());
		if (emp.getDesignation() != null)
			employee.setDesignation(emp.getDesignation());
		if (emp.getEmailid() != null)
			employee.setEmailid(emp.getEmailid());
		if (emp.getSalary() != null)
			employee.setSalary(emp.getSalary());

		return empRepo.save(employee);
	}

}

