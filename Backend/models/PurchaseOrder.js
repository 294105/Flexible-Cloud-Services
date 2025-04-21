const mongoose = require('mongoose');

// Purchase Order Schema
const purchaseOrderSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  trainerName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  numberOfDays: {
    type: Number,
    required: true
  },
  dailyCost: {
    type: Number,
    required: true
  },
  totalCost: {
    type: Number,
    default: 0
  },
  trainerCost: {
    type: Number
  }
}, { timestamps: true });

// Calculate the total cost before saving and update trainer salary
purchaseOrderSchema.pre('save', async function (next) {
  this.totalCost = this.numberOfDays * this.dailyCost; // Total cost based on days and daily cost
  
  // The trainerCost should be explicitly set in the request, which is used to update the salary
  const trainerCost = this.trainerCost;

  // Find the employee (trainer) to update salary
  const Employee = mongoose.model('Employee');
  const employee = await Employee.findOne({ name: this.trainerName });

  if (employee) {
    // Update employee salary by adding trainer cost
    employee.salary += trainerCost;

    // Save the updated employee
    await employee.save();
    console.log(`💰 Updated salary for ${employee.name}: ${employee.salary}`);
  }

  // Find the company to update financials
  const Company = mongoose.model('Company');
  const company = await Company.findOne();

  if (company) {
    // Update company finance summary
    company.financeSummary.cumulativeRevenue += this.totalCost;
    company.financeSummary.cumulativeCost += trainerCost; // Only consider trainerCost for salary payments
    company.financeSummary.profit = company.financeSummary.cumulativeRevenue - company.financeSummary.cumulativeCost;

    // Save company finance updates
    await company.save();
    console.log('🏦 Company Financials Updated');
  }

  next();
});

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
module.exports = PurchaseOrder;
