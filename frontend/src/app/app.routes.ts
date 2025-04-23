import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PurchaseOrderComponent } from './components/purchase-order/purchase-order.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { EmployeeSalaryComponent } from './components/employee-salary/employee-salary.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
 
  { path: 'purchase-order', component: PurchaseOrderComponent },
  { path: 'invoices', component: InvoiceComponent },
  { path: 'employee-salary', component: EmployeeSalaryComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
