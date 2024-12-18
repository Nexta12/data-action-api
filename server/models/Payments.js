const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  customerId: String,
  applicantName: {type: String, required: true}, 
  applicantEmail: {type: String, required: true}, 
  phoneNumber: String,
  paymentFor: {type: String, required: true}, 
  amount: {type: Number }, 
  invoice: String,
  status: {type: Boolean, default: false}

},{timestamps: true})


module.exports = mongoose.model("Payment", paymentSchema);