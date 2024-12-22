const ProjectSales = require('../models/ProjectSales')
const axios = require('axios');
const Project = require("../models/Projects")
const path = require("path");
module.exports = {
  create: async (req, res) => {
    try {
      const application = await ProjectSales.create(req.body);

      res.status(201).json(application);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  allApplications: async (req, res) => {
    try {

      const application = await ProjectSales.find().sort({
        createdAt: "desc",
      });

     res.status(200).json(application);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  getOneById: async (req, res) => {
    const { id } = req.params;
    try {
      const application = await ProjectSales.findById(id);

      res.status(200).json(application);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await ProjectSales.findByIdAndDelete(id);

      res.status(200).json("Deleted Successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  downloadDataSet: async(req, res)=>{
      try {
          const { id } = req.params;
      
          // Find course by ID
          const course = await Project.findById(id);
          if (!course) {
            return res.status(404).json("Course not found");
          }
      
          const datasetLink = course.dataset[0]?.url;
          if (!datasetLink) {
            return res.status(404).json("Course outline not found");
          }
      
          // Download the file from Cloudinary
          const response = await axios({
            method: 'GET',
            url: datasetLink,
            responseType: 'stream',
          });
      
          if (response.status !== 200) {
            return res.status(response.status).json("Failed to download the file");
          }
      
          const fileName = path.basename(datasetLink ); // Extract file name
          const contentLength = response.headers['content-length'];
      
          // Set headers for file download
          res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
          res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
          if (contentLength) {
            res.setHeader('Content-Length', contentLength);
          }
      
          // Pipe the response stream to the client
          response.data.pipe(res);
      
          response.data.on('end', () => {
            console.log('File download completed');
          });
      
          response.data.on('error', (err) => {
            console.error('An error occurred while downloading:', err.message);
            res.status(500).json("An error occurred while downloading the file.");
          });
        } catch (error) {
          console.error('Error:', error.message);
          res.status(500).json("Internal Server Error");
        }
  },
  downloadDataSetDocs: async(req, res)=>{
      try {
          const { id } = req.params;
      
          // Find course by ID
          const course = await Project.findById(id);
          if (!course) {
            return res.status(404).json("Course not found");
          }
      
          const datasetDocs = course.datasetDocs[0]?.url;
          if (!datasetDocs) {
            return res.status(404).json("Course outline not found");
          }
      
          // Download the file from Cloudinary
          const response = await axios({
            method: 'GET',
            url: datasetDocs,
            responseType: 'stream',
          });
      
          if (response.status !== 200) {
            return res.status(response.status).json("Failed to download the file");
          }
      
          const fileName = path.basename(datasetDocs ); // Extract file name
          const contentLength = response.headers['content-length'];
      
          // Set headers for file download
          res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
          res.setHeader('Content-Type', response.headers['content-type'] || 'application/octet-stream');
          if (contentLength) {
            res.setHeader('Content-Length', contentLength);
          }
      
          // Pipe the response stream to the client
          response.data.pipe(res);
      
          response.data.on('end', () => {
            console.log('File download completed');
          });
      
          response.data.on('error', (err) => {
            console.error('An error occurred while downloading:', err.message);
            res.status(500).json("An error occurred while downloading the file.");
          });
        } catch (error) {
          console.error('Error:', error.message);
          res.status(500).json("Internal Server Error");
        }
  }
};
