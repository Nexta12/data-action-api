const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
  title: {type: String, required: true}, 
  price: {type: Number, required: true}, 
  images: [],
  courseOutline: [],
  totalModules: String,
  experienceLevel: String,
  slug: String,
  snippet: String,
  duration: {type: String}, 
  totalEnrolled: {type: Number, default: 0 }, 
  description: String,
  whatYoudLearn: [],
  weeklyTimeRequirement: String

},{timestamps: true})



module.exports = mongoose.model("Course", courseSchema);