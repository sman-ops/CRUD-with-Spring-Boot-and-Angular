package com.example.crud.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.crud.entities.Employee;


@Repository
public interface EmployeeRepo extends JpaRepository<Employee,Long> {
	
	void deleteEmployeeById(Long id);
	
	Optional<Employee> findEmployeeById(Long id);
	
	

}
