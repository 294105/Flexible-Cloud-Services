import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-invoice',
  imports: [CommonModule, DatePipe],
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  invoices: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getInvoices().subscribe(data => {
      this.invoices = data;
    });
  }
}
