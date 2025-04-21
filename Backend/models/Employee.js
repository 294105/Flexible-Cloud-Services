const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: String,
  paid: {
    type: String,
    default: 'No'
  },
  salary: {
    type: Number,
    required: true
  },
  trainerBankDetails: {
    accountHolder: { type: String },
    accountNumber: { type: String },
    bankName: { type: String, required: true },
    ifscCode: { type: String, required: true }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  paymentDate: {
    type: String,
    default: 'NOT PAID YET'
  }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

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

module.exports = { Employee, addDefaultEmployee };
