const mongoose = require('mongoose')

const projectsSchema = new mongoose.Schema({
  title: String,
  industry: {type: String, required: true, lowercase: true}, 
  price: {type: Number, required: true, default: 0}, 
  difficultyLevel: {type: String, enum: ['Beginner', 'Intermediate', 'Advanced']},
  purpose: String,
  dataset: [],
  slug: String,
  keytext: String

},{timestamps: true})


module.exports = mongoose.model("Projects", projectsSchema);