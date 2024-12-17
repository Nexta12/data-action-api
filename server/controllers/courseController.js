const Course = require("../models/Courses");
const axios = require('axios');
const path = require("path")
module.exports = {
  createCourse: async (req, res) => {
    try {
      const course = await Course.create(req.body);
      res.status(201).send(course);
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal Server Error");
    }
  },

  downloadCourseOutline: async(req, res) =>{
    try {
      const { id } = req.params;
  
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
  
      const courseOutlineLink = course.courseOutline[0]?.url;
      if (!courseOutlineLink) {
        return res.status(404).json({ error: "Course outline not found" });
      }
  
      // Download the file from Cloudinary
      const response = await axios({
        method: 'GET',
        url: courseOutlineLink,
        responseType: 'stream',
      });
  
      const fileName = path.basename(courseOutlineLink); // Extract file name from URL
      console.log("Downloading file:", fileName);
  
      // Set headers for file download
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      res.setHeader('Content-Type', 'application/pdf');
  
      // Pipe the response to the client
      response.data.pipe(res);
  
      response.data.on('end', () => {
        console.log('File download completed');
        res.end();
      });
  
      response.data.on('error', (err) => {
        console.error('An error occurred while downloading:', err.message);
        res.status(500).json({ error: "An error occurred while downloading the file." });
      });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find({}).sort({ createdAt: "desc" });

      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  },
  getOneCourse: async (req, res) => {

    try {
      const course = await Course.findById(req.params.id)

      res.status(200).json(course)
      
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  },
  editCourse: async (req, res) => {},
  deleteCourse: async (req, res) => {
    try {
     await Course.findByIdAndDelete(req.params.id);

     res.status(200).json("Deleted")
      
    } catch (error) {
      res.status(500).json("Internal Server Error")
    }
  },
};
