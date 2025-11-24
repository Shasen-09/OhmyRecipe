import { useEffect, useState } from "react";

export default function Success() {
  const [message, setMessage] = useState("Verifying payment...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pidx = params.get("pidx");

    if (!pidx) {
      setMessage("❌ Invalid payment. No payment ID found.");
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch("http://localhost:8000/payment/khalti/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pidx }),
        });

        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }

        const data = await res.json();

        if (data.status === "Completed") {
          setMessage("🎉 Payment Successful! Premium Activated.")
          setTimeout(() => {
            window.location.href = "/home";
          }, 3000);
        } else if (data.status === "Pending") {
          setMessage("⏳ Payment is pending. Please wait.");
        } else {
          setMessage("❌ Payment failed or cancelled.");
          window.location.href = "/failure";
        }
      } catch (error) {
        console.error("Verification error:", error);
        setMessage("❌ Error verifying payment. Please contact support.");
        window.location.href = "/failure";
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "20px",
      backgroundColor: "#f0f4f8",
    }}>
      <div style={{
        maxWidth: "500px",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
          {loading ? "Verifying payment..." : message}
        </h1>
      </div>
    </div>
  );
}
