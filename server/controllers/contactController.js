const Contact = require("../models/Contacts");
module.exports = {
  createMessage: async (req, res) => {
    try {
      const message = await Contact.create(req.body);

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  allMessages: async (res) => {
    try {
      const messages = await Contact.find().sort({
        createdAt: "desc",
      });

      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  getOneById: async (req, res) => {
    const { id } = req.params;
    try {
      const messages = await Contact.findById(id);

      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await Contact.findByIdAndDelete(id);

      res.status(200).json("Deleted Successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
};
