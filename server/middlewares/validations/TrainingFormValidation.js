const { formatDateToDDMMYY } = require("../../../utils/helpers");

module.exports = {
  ValidateTrainingForm: async (req, res, next) => {
    try {
      const validRegex = /^[A-Za-z -]+$/; // test name
      const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      const { applicantName, applicantEmail, trainingType, choiceDate } =
        req.body;

      if (!applicantName || applicantName === "") {
        return res.status(422).send("Please provide your name");
      }

      if (!validRegex.test(applicantName)) {
        return res.status(422).send("You've provided an Invalid name");
      }

      if (!applicantEmail || applicantEmail === "") {
        return res.status(422).send("Please provide your email");
      }

      if (!validEmail.test(applicantEmail)) {
        return res.status(422).send("Email is Invalid");
      }

      if (!trainingType || trainingType === "") {
        return res.status(422).send("Please provide consultation type ");
      }
      if (!choiceDate || choiceDate === "") {
        return res.status(422).send("Please choose a date ");
      }
      
      req.body.choiceDate = formatDateToDDMMYY(choiceDate)
      req.body.status = `Registration`

      next();
    } catch (error) {
      res.statu(422).send(error.message);
    }
  },
};
