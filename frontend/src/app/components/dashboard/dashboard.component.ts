import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';

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
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  budget: number = 0;
  totalRevenue: number = 0;
  totalSalaries: number = 0;
  profit: number = 0;
  loading: boolean = true; // Add a loading flag
  errorMessage: string = ''; // Add an error message property

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loading = true; // Set loading to true when the component initializes
    this.api.getFinanceDetails().subscribe({
      next: (data: FinanceDetails) => { // Use the FinanceDetails interface
        this.budget = data.budget;
        this.totalRevenue = data.totalRevenue;
        this.totalSalaries = data.totalSalaries;
        this.profit = data.profit;
        this.loading = false; // Set loading to false when data is received
      },
      error: (err) => {
        console.error('Error fetching finance data:', err);
        this.errorMessage = 'Error loading dashboard data. Please try again later.'; // Display an error message
        this.loading = false; // Set loading to false even on error
      }
    });
  }
}