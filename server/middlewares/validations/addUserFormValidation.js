const User = require("../../models/User")
module.exports = {
  ValidateAddUserForm: async (req, res, next) => {
    try {
      const validRegex = /^[A-Za-z -]+$/; // test name
      const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      const { firstName, lastName, email, password } =
        req.body;

      if (!firstName || firstName === "") {
        return res.status(422).send("Please provide your name");
      }

      if (!lastName || lastName === "") {
        return res.status(422).send("Please provide your name");
      }

      if (!validRegex.test(firstName) || !validRegex.test(lastName)) {
        return res.status(422).send("You've provided an Invalid name");
      }

      if (!email || email === "") {
        return res.status(422).send("Please provide your email");
      }

      if (!validEmail.test(email)) {
        return res.status(422).send("Email is Invalid");
      }

      if(!password || password === ""){
        return res.status(422).send("Password is required");
      }

      if(password.length < 4 ){
        return res.status(422).send("Password is too weak");
      }

      const userExists = await User.findOne({email});
      if(userExists){
       return res.status(422).send("This Account already exist");
      }

      next();
    } catch (error) {
      res.statu(422).send(error.message);
    }
  },
  ValidateEditUserForm: async (req, res, next) => {
    try {
      const validRegex = /^[A-Za-z -]+$/; // test name
      const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      const { firstName, lastName, email, password } =
        req.body;

      if (!firstName || firstName === "") {
        return res.status(422).send("Please provide your name");
      }

      if (!lastName || lastName === "") {
        return res.status(422).send("Please provide your name");
      }

      if (!validRegex.test(firstName) || !validRegex.test(lastName)) {
        return res.status(422).send("You've provided an Invalid name");
      }

      if (!email || email === "") {
        return res.status(422).send("Please provide your email");
      }

      if (!validEmail.test(email)) {
        return res.status(422).send("Email is Invalid");
      }

      if(password && password.length < 4 ){
        return res.status(422).send("Password is too weak");
      }

      next();
    } catch (error) {
      res.statu(422).send(error.message);
    }
  },
};
