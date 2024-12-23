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
  
      // Pipe the archive to the response
      zip.pipe(res);
  
      // Function to download a file from Cloudinary
      const downloadFile = async (url) => {
        try {
          const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream',
            timeout: 60000, // Timeout after 60 seconds
          });
  
          if (response.status !== 200) {
            console.error(`Failed to download file: ${url}`);
            return null; // Ignore this file and continue
          }
  
          const fileName = path.basename(url); // Extract file name from the URL
          return { fileName, data: response.data };
        } catch (error) {
          console.error(`Error downloading file from Cloudinary: ${error.message}`);
          return null; // Ignore this file and continue
        }
      };
  
      // Download all files concurrently
      const filePromises = datasetLinks.map(async (url) => {
        const file = await downloadFile(url);
        if (file) {
          zip.append(file.data, { name: file.fileName });
        }
      });
  
      // Wait for all file downloads to complete
      await Promise.all(filePromises);
  
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
  
      const datasetDocsLinks = course.dataset.map(item => item.url);
      if (!datasetDocsLinks || datasetDocsLinks.length === 0) {
        return res.status(404).json("Dataset not found");
      }
  
      // Create a zip stream
      const zip = archiver('zip', {
        zlib: { level: 9 } // Set the compression level
      });
  
      // Set headers for downloading a zip file
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="datasetDocs.zip"');
  
      // Pipe the archive to the response
      zip.pipe(res);
  
      // Function to download a file from Cloudinary
      const downloadFile = async (url) => {
        try {
          const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream',
            timeout: 60000, // Timeout after 60 seconds
          });
  
          if (response.status !== 200) {
            console.error(`Failed to download file: ${url}`);
            return null; // Ignore this file and continue
          }
  
          const fileName = path.basename(url); // Extract file name from the URL
          return { fileName, data: response.data };
        } catch (error) {
          console.error(`Error downloading file from Cloudinary: ${error.message}`);
          return null; // Ignore this file and continue
        }
      };
  
      // Download all files concurrently
      const filePromises = datasetDocsLinks.map(async (url) => {
        const file = await downloadFile(url);
        if (file) {
          zip.append(file.data, { name: file.fileName });
        }
      });
  
      // Wait for all file downloads to complete
      await Promise.all(filePromises);
  
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
