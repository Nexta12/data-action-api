module.exports = {
    ValidateServiceForm: async (req, res, next) => {
      try {

    
        const { title, price, category } = req.body;
  
        if (!title || title === "") {
          return res.status(422).send("Please provide your title");
        }
  
        if (!price || price === "") {
          return res.status(422).send("Please provide your price");
        }
        if (!category || category === "") {
          return res.status(422).send("Please provide your category");
        }

    
        next();
      } catch (error) {
        res.statu(422).send(error.message);
      }
    },
  };
  