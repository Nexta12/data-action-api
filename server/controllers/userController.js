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
      const users = await User.find({ email: { $ne: process.env.SUPER_EMAIL } });

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
      const updateData = { ...req.body };
  
      // Hash the password if provided
      if (req.body.password && req.body.password.trim() !== "") {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(req.body.password, salt);
      } else {
        // Remove the password field to prevent overwriting it with an empty value
        delete updateData.password;
      }
  
      // Whitelist fields to update
      const allowedUpdates = ["firstName", "email", "lastName", "password", "role"];
      const updates = {};
      for (const key of allowedUpdates) {
        if (key in updateData) updates[key] = updateData[key];
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }
  
      res.status(200).send("Updated Successfully");
    } catch (error) {
      console.error(error); // Log the actual error for debugging
      res.status(500).json("Internal Server Error");
    }
  },
  updateSuperAdmin: async (req, res) => {
    try {
  
      const updatedUser = await User.findOneAndUpdate(
        {email: 'ernestez12@gmail.com'},
        { $set: {role: 'Super Admin'} },
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }
  
      res.status(200).send("Updated Successfully");
    } catch (error) {
      console.error(error); // Log the actual error for debugging
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
