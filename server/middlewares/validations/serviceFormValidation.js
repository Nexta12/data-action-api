module.exports = {
    ValidateServiceForm: async (req, res, next) => {
      try {

    console.log(req.body)
        const { title, price } = req.body;
  
        if (!title || title === "") {
          return res.status(422).send("Please provide your title");
        }
  
        next();
      } catch (error) {
        res.statu(422).send(error.message);
      }
    },
  };
  