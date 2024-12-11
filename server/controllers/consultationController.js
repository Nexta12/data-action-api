const Consultation = require("../models/Consultation");

module.exports = {
  bookConsultation: async (req, res) => {
    try {
      const consultation = await Consultation.create(req.body);

      res.status(201).json(consultation);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  allConsultation: async (res) => {
    try {
      const consultation = await Consultation.find().sort({
        createdAt: "desc",
      });

      res.status(200).json(consultation);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  getOneById: async (req, res) => {
    const { id } = req.params;
    try {
      const consultation = await Consultation.findById(id);

      res.status(200).json(consultation);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await Consultation.findByIdAndDelete(id);

      res.status(200).json("Deleted Successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
};
