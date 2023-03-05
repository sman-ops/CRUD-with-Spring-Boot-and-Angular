package com.example.crud.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.crud.entities.Employee;
import com.example.crud.exception.UserNotFoundException;
import com.example.crud.repository.EmployeeRepo;


@Service
public class EmployeeService {
	
	

	private final EmployeeRepo employeeRepo;
	
	@Autowired
	public EmployeeService(EmployeeRepo employeeRepo ) {
		this.employeeRepo=employeeRepo;
	}
	
	/**
	 * 
	 * @param employee
	 * @return
	 */
	
	public  Employee addEmployee(Employee employee) {
		employee.setEmployeeCode(UUID.randomUUID().toString());
		
		return employeeRepo.save(employee);

		
	}
	
	/**
	 * 
	 * @return
	 */
	
	public List<Employee> findAllEmployees(){
		
		return employeeRepo.findAll();
		
	}
	
	/**
	 * 
	 * @param employee
	 * @return
	 */
	
	public Employee updateEmployee(Employee employee) {
		
		return employeeRepo.save(employee);
	}
	
	/**
	 * 
	 * @param id
	 * @return
	 */
	
	
	public Employee findEmployeeById(Long id) {
        return employeeRepo.findEmployeeById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }
	
	
	public void deleteEmployee(Long id) {
		employeeRepo.deleteById(id);
	}
	
	
	

}
