
const transporter = require("../utils/emailServer");
const { ProjectSaleSuccessTemplate, ConsultationBookingEmailTemplate, TrainingRegistrationSuccess, TrainingPayment } = require("./emailTemplate");

module.exports = {

  ProjectSuccessEmail: async (user, product) => {
    try {

      const mailOptions = {
        from: `"Data Actions" <${process.env.SUPPORT_EMAIL}>'`,
        to: `${user.email}`,
        subject: "Data Project Purchase",
        html: ProjectSaleSuccessTemplate(user, product),
        headers: {
          "List-Unsubscribe":
            "<https://dataactions.com/unsubscribe>, <mailto:unsubscribe@dataactions.com>",
        },
      };

  

      await transporter.sendMail(mailOptions);
      console.log('Email Sent')
    } catch (err) {
      console.log(err)
    }
  },

  ConsultationBookingSuccess: async (user) => {
    try {

      const mailOptions = {
        from: `"Data Actions" <${process.env.SUPPORT_EMAIL}>'`,
        to: `${user.email}`,
        subject: "Consultation Booking",
        html: ConsultationBookingEmailTemplate(user),
        headers: {
          "List-Unsubscribe":
            "<https://dataactions.com/unsubscribe>, <mailto:unsubscribe@dataactions.com>",
        },
      };

      await transporter.sendMail(mailOptions);
      console.log('Email Sent')
    } catch (err) {
      console.log(err)
    }
  },

  TrainingRegisteration: async (user) => {
    try {

      const mailOptions = {
        from: `"Data Actions" <${process.env.SUPPORT_EMAIL}>'`,
        to: `${user.email}`,
        subject: "Training registration",
        html: TrainingRegistrationSuccess(user),
        headers: {
          "List-Unsubscribe":
            "<https://dataactions.com/unsubscribe>, <mailto:unsubscribe@dataactions.com>",
        },
      };

      await transporter.sendMail(mailOptions);
      console.log('Email Sent')
    } catch (err) {
      console.log(err)
    }
  },

  TrainingPaymentSuccess: async (user) => {
    try {

      const mailOptions = {
        from: `"Data Actions" <${process.env.SUPPORT_EMAIL}>'`,
        to: `${user.email}`,
        subject: "Training registration",
        html: TrainingPayment(user),
        headers: {
          "List-Unsubscribe":
            "<https://dataactions.com/unsubscribe>, <mailto:unsubscribe@dataactions.com>",
        },
      };

      await transporter.sendMail(mailOptions);
      console.log('Email Sent')
    } catch (err) {
      console.log(err)
    }
  },

};
