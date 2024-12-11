const mongoose = require('mongoose')

const consultationSchema = new mongoose.Schema({
  applicantName: {type: String, required: true}, 
  applicantEmail: {type: String, required: true}, 
  consultationType: {type: String, required: true}, 
  choiceDate: {type: Date }, 
  comment: {type: String, required: true}, 

},{timestamps: true})


module.exports = mongoose.model("Consultation", consultationSchema);