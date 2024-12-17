const { getSnippet } = require("../../../utils/helpers");

module.exports = {
  ValidateCreateCourseForm: async (req, res, next) => {
    try {
      const {
        title,
        price,
        duration,
        description,
        whatYoudLearn
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

      const parsedArray = JSON.parse(whatYoudLearn);

      req.body.whatYoudLearn = parsedArray.map(item => ({point: item}))
     
       next();
    } catch (error) {
      res.statu(422).send(error.message);
    }
  },
};
