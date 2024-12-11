const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title: {type: String, required: true}, 
  price: {type: Number, required: true}, 
  coverImage: String,
  duration: {type: String}, 
  totalEnrolled: {type: Number }, 
  description: {type: String, required: true},
  whatYoudLearn: [String],
  weeklyTimeRequirement: String

},{timestamps: true})


module.exports = mongoose.model("Course", courseSchema);