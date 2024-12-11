const mongoose = require('mongoose')

const trainingSchema = new mongoose.Schema({
  applicantName: {type: String, required: true}, 
  applicantEmail: {type: String, required: true}, 
  phoneNumber: String ,
  trainingType: {type: String, required: true}, 
  choiceDate: {type: Date }, 
  comment: String, 

},{timestamps: true})


module.exports = mongoose.model("Training", trainingSchema);