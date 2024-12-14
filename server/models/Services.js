const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
  title: {type: String, required: true}, 
  price: {type: Number, required: true, default: 0}, 
  category: {type: String, enum: ['Course', 'Service']}, 

},{timestamps: true})


module.exports = mongoose.model("Service", serviceSchema);