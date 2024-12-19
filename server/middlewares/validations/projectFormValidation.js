module.exports = {
    ValidateProjectForm: async (req, res, next) => {
      try {

    
        const { title, price, industry, difficultyLevel } = req.body;
  
        if (!title || title === "") {
          return res.status(422).send("Please provide your title");
        }
  
        if (!price || price === "") {
          return res.status(422).send("Please provide price");
        }
        if (!industry || industry === "") {
          return res.status(422).send("Please provide industry");
        }
        if (!difficultyLevel  || difficultyLevel  === "") {
          return res.status(422).send("Please provide difficulty Level ");
        }
      
        next();
      } catch (error) {
        res.statu(422).send(error.message);
      }
    },
  };
  