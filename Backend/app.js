// app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const Employee = require('./models/Employee');
const Company = require('./models/Company');
const { autoPaySalaries } = require('./controllers/salaryController');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const financeRoutes = require('./routes/finance');
app.use('/api/finance', financeRoutes);

const purchaseOrderRoutes = require('./routes/purchaseOrders');
app.use('/api/purchase-orders', purchaseOrderRoutes);

const invoiceRoutes = require('./routes/invoices');
app.use('/api/invoices', invoiceRoutes);

app.use('/api/employees', require('./routes/employees'));
app.use('/api/salaries', require('./routes/salaries'));

const dashboardRoutes = require('./routes/dashboard');
app.use('/api', dashboardRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('🌐 Flexible Cloud Services API is running');
});

// Auto-trigger salary payment
console.log('Salary payment automatically triggered');
autoPaySalaries();

// Add default employee "Sarath"
async function addDefaultEmployee() {
  try {
    const existing = await Employee.findOne({ name: 'Sarath' });
    if (!existing) {
      const sarath = new Employee({
        name: 'Sarath',
        role: 'Trainer',
        salary: 50000,
        paid: 'yes',
        trainerBankDetails: {
          accountHolder: 'Sarath',
          accountNumber: '1234567890',
          bankName: 'HDFC Bank',
          ifscCode: 'HDFC0001234',
        },
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
          ifscCode: 'UTIB0001234',
        },
        financeSummary: {
          currentBudget: 1000000,
        },
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

// Call the functions to add default data
addDefaultEmployee();
addDefaultCompany();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
