package com.vcube.react_employeemanagement.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.vcube.react_employeemanagement.entity.EmployeeManagement;
import com.vcube.react_employeemanagement.exception.ResourceNotFoundException;
import com.vcube.react_employeemanagement.service.EmployeeService;



@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins ="http://localhost:3000")
public class EmployeeController {
	
	@Autowired
	private EmployeeService empService;
	
	@PostMapping("/insertEmp")
	public EmployeeManagement insertEmployee(@RequestBody EmployeeManagement emp) {
		return empService.insertEmp(emp);
	}
	
	
	@GetMapping("/empList")
	public List<EmployeeManagement> getAllEmployee(){
		return empService.getAllEmployees();
	}
	
	@GetMapping("/getEmp/{empid}")
	public EmployeeManagement getEmployeeById(@PathVariable int empid) throws ResourceNotFoundException{
		return empService.getEmpById(empid);
	}
	
	@PutMapping("/updateEmp/{empid}")
	ResponseEntity<EmployeeManagement> updateEmployee(@RequestBody EmployeeManagement emp,
			@PathVariable int empid)throws ResourceNotFoundException{
		EmployeeManagement employee=empService.updateEmployee(emp,empid);
		return ResponseEntity.ok(employee);
	}
	
	@DeleteMapping("/deleteEmp/{empid}")
	public ResponseEntity<?> deleteEmployee(@PathVariable("empid") int empid){
		try {
			empService.deleteEmployeeById(empid);
			return new ResponseEntity<>("employee with id "+empid+" deleted..",HttpStatus.OK);
		}catch(ResourceNotFoundException e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/deleteEmployees")
	public ResponseEntity<String> deleteAllEmployees(){
		empService.deleteEmployees();
		return ResponseEntity.ok("All Employees deleted successfully...");
	}
	
	@PatchMapping("/{empid}")
    public EmployeeManagement patchEmployee(@RequestBody EmployeeManagement emp, @PathVariable int  empid)
            throws ResourceNotFoundException {
        
        EmployeeManagement existingEmp = empService.getEmpById(empid);

        if (emp.getEmpname() != null) existingEmp.setEmpname(emp.getEmpname());
        if (emp.getAge() != null) existingEmp.setAge(emp.getAge());
        if (emp.getDesignation() != null) existingEmp.setDesignation(emp.getDesignation());
        if (emp.getEmailid() != null) existingEmp.setEmailid(emp.getEmailid());
        if (emp.getSalary() != null) existingEmp.setSalary(emp.getSalary());

        return empService.updateEmployee(existingEmp, empid);
        
	}

}
