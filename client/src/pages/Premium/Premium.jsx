import { useState } from "react";

export default function Premium() {
  const [loading, setLoading] = useState(false);

  const handleKhaltiPayment = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: "1000",
          productName: "Premium Access",
        }),
      });


      const data = await response.json();
      if (data.khaltiPaymentUrl) {
        window.location.href = data.khaltiPaymentUrl;
      } else {
        alert("Payment initiation failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ background: "white", padding: 30, borderRadius: 12, textAlign: "center" }}>
        <h1>Premium Subscription</h1>
        <p>Unlock premium features with one click payment.</p>
        <button onClick={handleKhaltiPayment} disabled={loading}>
          {loading ? "Processing..." : "Pay with Khalti"}
        </button>
      </div>
    </div>
  );
}
