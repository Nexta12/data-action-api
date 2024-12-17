const { getSnippet } = require("../../../utils/helpers");

module.exports = {
  ValidateCreateCourseForm: async (req, res, next) => {
    try {
      const {
        title,
        price,
        duration,
        description
      } = req.body;

      if (!title || title === "") {
        return res.status(422).send("Please provide your title");
      }


      if (!price || price === "") {
        return res.status(422).send("Please provide your price");
      }

      if (!duration || duration === "") {
        return res.status(422).send("Duration cannot be empty ");
      }
      if(description){
        req.body.snippet = getSnippet(description, 10)
      }

      next();
    } catch (error) {
      res.statu(422).send(error.message);
    }
  },
};
