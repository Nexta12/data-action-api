const Service = require("../models/Services");
module.exports = {
  createService: async (req, res) => {
    try {
      const service = await Service.create(req.body);
      res.status(201).json(service);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  },

  allServices: async (req, res) => {
    try {
      const services = await Service.find().sort({
        createdAt: "desc",
      });

      res.status(200).json(services);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  getOneById: async (req, res) => {
    const { id } = req.params;
    try {
      const services = await Service.findById(id);

      res.status(200).json(services);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  update: async (req, res) =>{
    const { id } = req.params;
    try {
      await Service.findByIdAndUpdate(id, {$set: req.body},{new: true});

      res.status(200).json("Updated Successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
    }

  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await Service.findByIdAndDelete(id);

      res.status(200).json("Deleted Successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
};
