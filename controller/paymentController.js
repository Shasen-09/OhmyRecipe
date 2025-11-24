import fetch from "node-fetch";
import crypto from "crypto";

const BASE_URL = process.env.BASE_URL;
const KHALTI_SECRET_KEY = process.env.KHALTI_SECRET_KEY;


export const initiateKhaltiPayment = async (req, res) => {
  try {
    const { amount, productName } = req.body;

    if (!amount || !productName) {
      return res.status(400).json({ error: "Missing required fields" });
    }


    const transactionId = "TXN-" + crypto.randomBytes(8).toString("hex");

    const khaltiConfig = {
      return_url: `${BASE_URL}/success?method=khalti&transaction_id=${transactionId}`,
      website_url: BASE_URL,
      amount: Math.round(parseFloat(amount) * 100),
      purchase_order_name: productName,
      customer_info: {
        name: "Test User",
        email: "test@example.com",
        phone: "9800000000",
      },
    };

    const response = await fetch("https://a.khalti.com/api/v2/epayment/initiate/", {
      method: "POST",
      headers: {
        Authorization: `Key ${KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(khaltiConfig),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: "Khalti initiation failed", details: data });
    }

    return res.json({ khaltiPaymentUrl: data.payment_url, pidx: data.pidx });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
};

export const verifyKhaltiPayment = async (req, res) => {
  const { pidx } = req.body;

  if (!pidx) return res.status(400).json({ error: "pidx is required" });

  try {
    const response = await fetch("https://a.khalti.com/api/v2/epayment/lookup/", {
      method: "POST",
      headers: {
        Authorization: `Key ${KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pidx }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Khalti API returned ${response.status}: ${text}`);
    }

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ error: "Verification failed", details: error.message });
  }
};
