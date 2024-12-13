const { generateAccessToken } = require("../middlewares/authorization");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = {
  addUser: async (req, res) => {
    const { email, firstName, lastName, password, role } = req.body;

    try {
      // Validate email
      if (!email || email.trim() === "") {
        return res.status(400).json({ message: "Email is required" });
      }
      if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.status(400).json({ message: "Email is invalid" });
      }

      // Validate password
      if (!password || password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters long" });
      }

      const userExists = await User.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: "This Account already exists" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = await User.create({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        role
      });

      // Send success response
      return res.status(201).json(newUser);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "An error occurred while adding the user" });
    }
  },
  login: async (req, res, next) => {

    let { email, password } = req.body;
    email = email.trim();
    if (email == "" && password == "") {
      return res.status(401).json("Provide Login Details" );
    }

    try {
      passport.authenticate("local", { session: true }, (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res
            .status(404)
            .send(info.message);
        }

        req.logIn(user, async (err) => {
          if (err) {
            return next(err);
          } else {
            // Generate and Send Access Tokens to client:
            const accessToken = generateAccessToken(user, jwt);
            const { password, createdAt, updatedAt, ...payload } = user._doc;

            return res.status(200).json({
              message: "Login successfully",
              accessToken,
              data: payload,
            });
          }
        });
      })(req, res, next);
    } catch (err) {
      res.status(500).json(err.message );
    }
  },
  validateAuth: async (req, res) => {
    try {

      const currentUser = req.user

      const userDetails = {
        id: currentUser._id,
        role: currentUser.role,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
      }
      res
        .status(200).json({data: userDetails})
    } catch (error) {
      res.status(500).send('Internal Server Error')
    }
  },
   // Logout function Handler
   logout: async (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.session.destroy(); // Clean up the session from Database
      res.status(200).json({ msg: "Logged Out" });
    });
  },
};
