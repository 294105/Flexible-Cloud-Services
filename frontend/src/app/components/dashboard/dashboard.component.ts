import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HeaderComponent } from '../header/header.component';

// Define an interface for the expected finance data
interface FinanceDetails {
  budget: number;
  totalRevenue: number;
  totalSalaries: number;
  profit: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  budget: number = 0;
  totalRevenue: number = 0;
  totalSalaries: number = 0;
  profit: number = 0;
  userData: any;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private http: HttpClient, private api: ApiService) {}

  ngOnInit(): void {
    this.loading = true;
    // First, check user authentication
    this.http.get('http://localhost:5000/auth/protected').subscribe({
      next: (res: any) => {
        this.userData = res;
        console.log('Authenticated user:', this.userData);
        // Now fetch finance details
        this.api.getFinanceDetails().subscribe({
          next: (data: FinanceDetails) => {
            this.budget = data.budget;
            this.totalRevenue = data.totalRevenue;
            this.totalSalaries = data.totalSalaries;
            this.profit = data.profit;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error fetching finance data:', err);
            this.errorMessage = 'Error loading finance data.';
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('User auth failed:', err);
        this.errorMessage = err.error?.message || 'Authentication failed.';
        this.loading = false;
      }
    });
  }
}
