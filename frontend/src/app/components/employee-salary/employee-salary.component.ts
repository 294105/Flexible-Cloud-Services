import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-employee-salary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-salary.component.html',
  styleUrls: ['./employee-salary.component.scss']
})
export class EmployeeSalaryComponent implements OnInit {
  employees: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  paySalary(id: string) {
    this.api.paySalary(id).subscribe(() => {
      alert('Salary paid!');
    });
  }
}
