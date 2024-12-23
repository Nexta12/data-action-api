const { generateInvoiceNumber } = require("../../utils/helpers");
const Payment = require("../models/Payments");
const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const Consultation = require("../models/Consultation");
const Training = require("../models/Training");
const ProjectSales = require("../models/ProjectSales");
const {
  ProjectSuccessEmail,
  ConsultationBookingSuccess,
  TrainingPaymentSuccess,
} = require("../../utils/emailCalls");
const Project = require("../models/Projects");

module.exports = {
  checkout: async (req, res) => {
    const {
      applicantName,
      applicantEmail,
      paymentFor,
      amount,
      paymentPurposeId,
    } = req.body;

    const customer = await stripe.customers.create({
      name: applicantName,
      email: applicantEmail,
      description: paymentFor,
      metadata: {
        purposeId: paymentPurposeId,
        amount,
      },
    });

    try {
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        line_items: [
          {
            price_data: {
              currency: "gbp",
              product_data: {
                name: paymentFor,
              },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${process.env.FRONTEND_BASE_URL}/payments/successful?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_BASE_URL}/payments/cancelled?session_id={CHECKOUT_SESSION_ID}`,
      });

      res.status(200).json(session.url);
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal Server Error");
    }
  },
  verifiedSuccess: async (req, res) => {
    const { sessionId } = req.body;

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["customer"],
      });

      // Access expanded customer details directly
      const customer = session.customer;

      const date = new Date(customer.created * 1000);
      const formattedDate = date.toISOString();

      const userDetails = {
        customerId: customer.id,
        applicantName: customer.name,
        applicantEmail: customer.email,
        paymentFor: customer.description,
        amount: customer.metadata.amount,
        createdAt: formattedDate,
        invoice: generateInvoiceNumber(),
        status: true,
      };
      const existingId = await Payment.findOne({ customerId: customer.id });
      if (!existingId) {
        await Payment.create(userDetails);
      }

      //  Send Emails for confirmation.
      const user = {
        email: userDetails.applicantEmail,
        name: userDetails.applicantName,
      };

      // Email for Consultaion.
      // For Project Sales
      const salesOfProject = await ProjectSales.findById(
        customer.metadata.purposeId
      );
      if (salesOfProject !== null) {
        const soldProId = salesOfProject.soldProjectId;
        const requiredProject = await Project.findById(soldProId);
        const product = {
          id: requiredProject._id,
          title: userDetails.paymentFor,
          cost: userDetails.amount,
        };
         await ProjectSuccessEmail(user, product);

      

        // Update Payment status
        await ProjectSales.findByIdAndUpdate(
          { _id: customer.metadata.purposeId },
          { $set: { status: "Dataset Sent" } }
        );
      }

      // for Consoltation Email

      const consultationData = await Consultation.findById(
        customer.metadata.purposeId
      );

      if (consultationData !== null) {
        // Send Consultation Email
        await ConsultationBookingSuccess(user);
        // Update consultation status
        await Consultation.findByIdAndUpdate(
          { _id: customer.metadata.purposeId },
          { $set: { status: true } }
        );
      }

      // For taining;

      const trainingData = await Training.findById(customer.metadata.purposeId);

      if (trainingData !== null) {
        // send Training email
        await TrainingPaymentSuccess(user);
        // Update trainig status
        await Training.findByIdAndUpdate(
          { _id: customer.metadata.purposeId },
          { $set: { status: "Paid" } }
        );
      }

      res.status(201).json("Success");
    } catch (error) {
      console.log(error);
      res.status(500).json("Internal server error");
    }
  },
  cancalledTransaction: async (req, res) => {
    const { sessionId } = req.body;

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["customer"],
      });

      // Access expanded customer details directly
      const customer = session.customer;

      const date = new Date(customer.created * 1000);
      const formattedDate = date.toISOString();

      const userDetails = {
        customerId: customer.id,
        applicantName: customer.name,
        applicantEmail: customer.email,
        paymentFor: customer.description,
        amount: customer.metadata.amount,
        createdAt: formattedDate,
        invoice: generateInvoiceNumber(),
      };

      const existingId = await Payment.findOne({ customerId: customer.id });
      if (!existingId) {
        await Payment.create(userDetails);
      }
      await Training.findByIdAndUpdate(
        { _id: customer.metadata.purposeId },
        { $set: { status: "Cancelled" } }
      );
      await ProjectSales.findByIdAndUpdate(
        { _id: customer.metadata.purposeId },
        { $set: { status: "Cancelled" } }
      );
      res.status(201).json("Success");
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  allApplications: async (req, res) => {
    try {
      const application = await Payment.find().sort({
        createdAt: "desc",
      });

      res.status(200).json(application);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  getOneById: async (req, res) => {
    const { id } = req.params;
    try {
      const application = await Payment.findById(id);

      res.status(200).json(application);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await Payment.findByIdAndDelete(id);

      res.status(200).json("Deleted Successfully");
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  },
};
