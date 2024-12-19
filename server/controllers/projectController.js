const Project = require("../models/Projects");
module.exports = {
  createProject: async (req, res) => {
    try {
      const project = await Project.create(req.body);
      res.status(201).json(project);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },

  allProjects: async (req, res) => {
    try {
      const projects = await Project.find().sort({
        createdAt: "desc",
      });

      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  getOneById: async (req, res) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);

      res.status(200).json(project);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  update: async (req, res) =>{
    const { id } = req.params;
    try {
      await Project.findByIdAndUpdate(id, {$set: req.body},{new: true});

      res.status(200).json("Updated Successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
    }

  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await Project.findByIdAndDelete(id);

      res.status(200).json("Deleted Successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
};
