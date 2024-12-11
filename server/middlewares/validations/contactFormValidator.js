module.exports = {
    ValidateContactForm: async (req, res, next) => {
      try {
        const validRegex = /^[A-Za-z -]+$/; // test name
        const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
    
        const { name, email, message} = req.body;
  
        if (!name || name === "") {
          return res.status(422).send("Please provide your name");
        }
  
        if (!validRegex.test(name)) {
          return res.status(422).send("You've provided an Invalid name");
        }
  
        if (!email || email === "") {
          return res.status(422).send("Please provide your email");
        }
  
        if (!validEmail.test(email)) {
          return res.status(422).send("Email is Invalid");
        }
  
        if (!message || message === "") {
          return res.status(422).send("Your Message cannot be empty ");
        }
    
        next();
      } catch (error) {
        res.statu(422).send(error.message);
      }
    },
  };
  