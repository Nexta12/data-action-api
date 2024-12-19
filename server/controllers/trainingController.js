const Training = require('../models/Training')

module.exports = {
  apply: async (req, res) => {
    try {
      const application = await Training.create(req.body);

      res.status(201).json(application);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  allApplications: async (req, res) => {
    try {

      const application = await Training.find().sort({
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
      const application = await Training.findById(id);

      res.status(200).json(application);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await Training.findByIdAndDelete(id);

      res.status(200).json("Deleted Successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
};
