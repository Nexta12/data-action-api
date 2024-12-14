module.exports = {
    ValidateServiceForm: async (req, res, next) => {
      try {

    
        const { title, price } = req.body;
  
        if (!title || title === "") {
          return res.status(422).send("Please provide your title");
        }
  
        if (!price || price === "") {
          return res.status(422).send("Please provide your price");
        }

    
        next();
      } catch (error) {
        res.statu(422).send(error.message);
      }
    },
  };
  