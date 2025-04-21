// app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const Employee = require('./models/Employee'); // Importing Employee model
const Company = require('./models/Company'); // Importing Company model

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Add default employee "Sarath"
async function addDefaultEmployee() {
  try {
    const existing = await Employee.findOne({ name: 'Sarath' });
    if (!existing) {
      const sarath = new Employee({
        name: 'Sarath',
        role: 'Trainer',
        salary: 50000,
        trainerBankDetails: {
          accountHolder: 'Sarath',
          accountNumber: '1234567890',
          bankName: 'HDFC Bank',
          ifscCode: 'HDFC0001234'
        }
      });
      await sarath.save();
      console.log('Default employee Sarath added');
    } else {
      console.log('Employee Sarath already exists');
    }
  } catch (err) {
    console.error('Error adding default employee:', err);
  }
}

// Add default company "Flexible Cloud Services"
async function addDefaultCompany() {
  try {
    const existing = await Company.findOne({ name: 'Flexible Cloud Services' });
    if (!existing) {
      const company = new Company({
        name: 'Flexible Cloud Services',
        address: 'Hyderabad, India',
        email: 'info@flexiblecloud.com',
        phone: '9876543210',
        bankDetails: {
          accountHolder: 'Flexible Cloud Services',
          accountNumber: '1234567890',
          bankName: 'Axis Bank',
          ifscCode: 'UTIB0001234'
        },
        financeSummary: {
          currentBudget: 1000000
        }
      });
      await company.save();
      console.log('Default company Flexible Cloud Services added');
    } else {
      console.log('Company Flexible Cloud Services already exists');
    }
  } catch (err) {
    console.error('Error adding default company:', err);
  }
}

module.exports = { addDefaultCompany, addDefaultEmployee }; // Export only once

// Routes
app.get('/', (req, res) => {
  res.send('🌐 Flexible Cloud Services API is running');
});

const financeRoutes = require('./routes/finance');
app.use('/api/finance', financeRoutes);

const purchaseOrderRoutes = require('./routes/purchaseOrders');
app.use('/api/purchase-orders', purchaseOrderRoutes);

const invoiceRoutes = require('./routes/invoices'); // Ensure the path is correct
app.use('/api/invoices', invoiceRoutes);

app.use('/api/employees', require('./routes/employees'));
app.use('/api/salaries', require('./routes/salaries'));

const dashboardRoutes = require('./routes/dashboard'); // Correct path to the dashboard route
app.use('/api', dashboardRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Call the functions to add default employee and company (if necessary)
addDefaultEmployee();
addDefaultCompany();
