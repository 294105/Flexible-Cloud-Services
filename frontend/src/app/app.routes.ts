import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { EmployeeSalaryComponent } from './components/employee-salary/employee-salary.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'purchase-order', component: PurchaseOrderComponent },
  { path: 'invoices', component: InvoiceComponent },
  { path: 'employee-salary', component: EmployeeSalaryComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
