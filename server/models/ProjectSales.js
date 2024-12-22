const mongoose = require('mongoose')

const projectSalesSchema = new mongoose.Schema({
  applicantName: {type: String, required: true}, 
  applicantEmail: {type: String, required: true}, 
  phoneNumber: String ,
  projectIndustry: {type: String, required: true}, 
  projectName: {type: String, required: true}, 
  soldProjectId: String,
  cost: {type: Number, default: 0 }, 
  status: String,
  comment: String, 

},{timestamps: true})


module.exports = mongoose.model("ProjectSales", projectSalesSchema);