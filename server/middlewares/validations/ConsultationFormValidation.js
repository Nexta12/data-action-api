module.exports = {
  ValidateConsulationForm: async (req, res, next) => {
    try {
      const validRegex = /^[A-Za-z -]+$/; // test name
      const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      const validDate = (input) => {
        const date = new Date(input);
        return date instanceof Date && !isNaN(date);
      };

      const { applicantName, applicantEmail, consultationType, choiceDate } =
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

      if (!consultationType || consultationType === "") {
        return res.status(422).send("Please provide consultation type ");
      }
      if (!choiceDate || choiceDate === "") {
        return res.status(422).send("Please choose a date ");
      }

      if (!validDate(choiceDate)) {
        return res.status(422).send("Date Input is wrong");
      }

      next();
    } catch (error) {
      res.statu(422).send(error.message);
    }
  },
};
