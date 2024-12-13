const Product = require("../models/Products");
module.exports = {
  createProduct: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      console.log(error)
      res.status(500).send("Internal Server Error");
    }
  },

  allProducts: async (req, res) => {
    try {
      const products = await Product.find().sort({
        createdAt: "desc",
      });

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  getOneById: async (req, res) => {
    const { id } = req.params;
    try {
      const products = await Product.findById(id);

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  update: async (req, res) =>{
    const { id } = req.params;
    try {
      await Product.findByIdAndUpdate(id, {$set: req.body},{new: true});

      res.status(200).json("Updated Successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
    }

  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await Product.findByIdAndDelete(id);

      res.status(200).json("Deleted Successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
};
