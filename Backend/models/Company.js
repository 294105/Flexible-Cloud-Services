const mongoose = require('mongoose');

const financeSummarySchema = new mongoose.Schema({
  currentBudget: {
    type: Number,
    default: 0
  },
  cumulativeRevenue: {
    type: Number,
    default: 0
  },
  cumulativeCost: {
    type: Number,
    default: 0
  },
  profit: {
    type: Number,
    default: 0
  }
}, { _id: false });

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  email: String,
  phone: String,

  bankDetails: {
    accountHolder: String,
    accountNumber: String,
    bankName: String,
    ifscCode: String
  },

  financeSummary: {
    type: financeSummarySchema,
    default: () => ({})
  }
}, { timestamps: true });

const Company = mongoose.model('Company', companySchema);
module.exports = Company;


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

module.exports = { addDefaultCompany };
