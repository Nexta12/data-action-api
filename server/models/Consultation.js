const mongoose = require('mongoose')

const consultationSchema = new mongoose.Schema({
  applicantName: {type: String, required: true}, 
  applicantEmail: {type: String, required: true}, 
  consultationType: {type: String, required: true}, 
  price: Number,
  status: { type: Boolean, default: false},
  choiceDate: {type: Date }, 
  comment: String, 

},{timestamps: true})


module.exports = mongoose.model("Consultation", consultationSchema);