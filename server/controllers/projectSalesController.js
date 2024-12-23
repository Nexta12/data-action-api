const ProjectSales = require('../models/ProjectSales')
const axios = require('axios');
const Project = require("../models/Projects")
const path = require("path");
const archiver = require("archiver");
const fs = require("fs");
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
  
  downloadDataSet: async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find course by ID
      const course = await Project.findById(id);
      if (!course) {
        return res.status(404).json("Course not found");
      }
  
      const datasetLinks = course.dataset.map(item => item.url);
      if (!datasetLinks || datasetLinks.length === 0) {
        return res.status(404).json("Dataset not found");
      }
  
      // Create a zip stream
      const zip = archiver('zip', {
        zlib: { level: 9 } // Set the compression level
      });
  
      // Set headers for downloading a zip file
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="dataset.zip"');
      res.setHeader('Content-Encoding', 'gzip');
  
      // Pipe the archive to the response
      zip.pipe(res);
  
      // Download each file from Cloudinary and append to the zip file
      for (const url of datasetLinks) {
        try {
          // Download the file from Cloudinary
          const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream',
          });
  
          if (response.status !== 200) {
            return res.status(response.status).json(`Failed to download file: ${url}`);
          }
  
          const fileName = path.basename(url); // Extract file name from the URL
  
          // Append the downloaded file to the zip
          zip.append(response.data, { name: fileName });
  
        } catch (error) {
          console.error(`Error downloading file from Cloudinary: ${error.message}`);
          return res.status(500).json(`Error downloading file from Cloudinary: ${error.message}`);
        }
      }
  
      // Finalize the zip archive
      zip.finalize();
  
      // Handle errors in the zip process
      zip.on('error', (err) => {
        console.error('Error while creating zip:', err.message);
        res.status(500).json("An error occurred while creating the zip file.");
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
  
      const datasetDocLinks = course.datasetDocs.map(item => item.url);
      if (!datasetDocLinks || datasetDocLinks.length === 0) {
        return res.status(404).json("Dataset not found");
      }
  
      // Create a zip stream
      const zip = archiver('zip', {
        zlib: { level: 9 } // Set the compression level
      });
  
      // Set headers for downloading a zip file
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="datasetDocs.zip"');
      res.setHeader('Content-Encoding', 'gzip');
  
      // Pipe the archive to the response
      zip.pipe(res);
  
      // Download each file from Cloudinary and append to the zip file
      for (const url of datasetDocLinks) {
        try {
          // Download the file from Cloudinary
          const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream',
          });
  
          if (response.status !== 200) {
            return res.status(response.status).json(`Failed to download file: ${url}`);
          }
  
          const fileName = path.basename(url); // Extract file name from the URL
  
          // Append the downloaded file to the zip
          zip.append(response.data, { name: fileName });
  
        } catch (error) {
          console.error(`Error downloading file from Cloudinary: ${error.message}`);
          return res.status(500).json(`Error downloading file from Cloudinary: ${error.message}`);
        }
      }
  
      // Finalize the zip archive
      zip.finalize();
  
      // Handle errors in the zip process
      zip.on('error', (err) => {
        console.error('Error while creating zip:', err.message);
        res.status(500).json("An error occurred while creating the zip file.");
      });
  
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json("Internal Server Error");
    }
  }
};
