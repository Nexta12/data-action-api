const { formatDateToDDMMYY } = require("../../../utils/helpers");

module.exports = {
  ValidateProjectSalesForm: async (req, res, next) => {
    try {
      const validRegex = /^[A-Za-z -]+$/; // test name
      const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      const { applicantName, applicantEmail, projectIndustry } =
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

      if (!projectIndustry  || projectIndustry  === "") {
        return res.status(422).send("Please provide consultation type ");
      }
    
      req.body.status = `Registration`

      next();
    } catch (error) {
      res.statu(422).send(error.message);
    }
  },
};