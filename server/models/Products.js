const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: {type: String, required: true}, 
  price: {type: Number, required: true, default: 0}, 
  category: {
    type: String,
    enum: ['Course', 'Service'],
    lowercase: true,
  },

},{timestamps: true})


module.exports = mongoose.model("Product", productSchema);