import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public employees!: Employee[];

  empDetail!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}

  createEmp() {
    this.empDetail = this.fb.group({
      id: [''],
      email: [''],
      name: [''],
      jobTitle: [],
      imageUrl: [''],
      phone: [''],
    });
  }

  ngOnInit() {
    this.getEmployees();
    this.createEmp();
  }

  addEmployee() {
    console.log(this.empDetail.value);
    let formData = this.empDetail.value;
    let data = {
      email: formData.email,
      imageUrl: formData.imageUrl,
      jobTitle: formData.jobTitle,
      name: formData.name,
      phone: formData.phone,
    };

    this.employeeService.addEmployee(data).subscribe((response: Employee) => {
      console.log(response);
      alert('employee added with success');
      this.getEmployees();
    });
  }

  editEmployee(emp: Employee) {
    this.empDetail.controls['id'].setValue(emp.id);
    this.empDetail.controls['email'].setValue(emp.email);
    this.empDetail.controls['imageUrl'].setValue(emp.imageUrl);
    this.empDetail.controls['jobTitle'].setValue(emp.jobTitle);
    this.empDetail.controls['name'].setValue(emp.name);
    this.empDetail.controls['phone'].setValue(emp.phone);
  }

  updateEmployee() {
    let formData = this.empDetail.value;
    let data = {
      id: formData.id,
      email: formData.email,
      imageUrl: formData.imageUrl,
      jobTitle: formData.jobTitle,
      name: formData.name,
      phone: formData.phone,
    };

    this.employeeService.updateEmployee(data).subscribe(
      (response: Employee) => {
        console.log(response);
        alert('Employee updated with successfully');
        this.getEmployees();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // we need to subscribe to this observable we notify whanever some data comes from the server
  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        console.log(response);
        this.employees = response;
      },
      (error) => {
        alert(error.message);
      }
    );
  }
}
