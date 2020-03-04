// Inititializing vars
const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  tags: { type: String, required: true },
  date: {type: Date}
},
  {
    timestamp: true
  }
)

const Transactions = mongoose.model('Transactions', transactionSchema)
module.exports = Transactions
