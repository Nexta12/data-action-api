const User = require("../models/User");
const bcrypt = require("bcryptjs");
module.exports = {
  createSuperAdmin: async (req, res) => {
    const superAdmin = {
      email: process.env.SUPER_EMAIL,
      firstName: process.env.FIRST_NAME,
      lastName: process.env.LAST_NAME,
      role: process.env.ROLE,
    };

    try {
      const superAdminExists = await User.findOne({
        email: superAdmin.email,
      });

      if (superAdminExists) {
        res.status(200).send("Work already in progress");
      } else {
        const bodyPassword = process.env.SUPER_PASSWORD;

        const hashedPassword = await bcrypt.hash(bodyPassword, 10);

        await User.create({
          password: hashedPassword,
          ...superAdmin,
        });
        res.status(200).send("Perfect Job just got done");
      }
    } catch (error) {
      console.log(error);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();

      res.status(200).send(users);
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  },
  getOne: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  },
  update: async (req, res) => {
    try {

      console.log(req.body)


      // await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
      // res.status(200).send('Updated Successfully');
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  },
  delete: async (req, res) => {
    try {
     await User.findByIdAndDelete(req.params.id);
      res.status(200).send("Deleted Successfully");
    } catch (error) {
      res.status(500).json("Internal Server Error");
    }
  },
};
