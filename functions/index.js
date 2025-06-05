const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.VITE_API_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

//route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

//payment route
app.post("/payment/create", async (req, res) => {
  //total as a query parameter
  const { total } = req.query;

  if (!total || total <= 0) {
    return res.status(400).json({ error: "Invalid payment total" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total), // Ensure it's an integer
      currency: "USD",
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Payment failed", details: err.message });
  }
});

//export using firebase
exports.api = onRequest(app);
