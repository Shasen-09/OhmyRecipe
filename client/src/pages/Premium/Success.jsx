import { useEffect, useState } from "react";

export default function Success() {
  const [message, setMessage] = useState("Verifying payment...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pidx = params.get("pidx");

    if (!pidx) {
      setMessage("Invalid payment. No payment ID found.");
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
          setMessage("Payment Successful! Premium Activated.");
          setTimeout(() => {
            window.location.href = "/home";
          }, 3000);
        } else if (data.status === "Pending") {
          setMessage("Payment is pending. Please wait.");
        } else {
          setMessage("Payment failed or cancelled.");
          window.location.href = "/failure";
        }
      } catch (error) {
        console.error("Verification error:", error);
        setMessage("Error verifying payment. Please contact support.");
        window.location.href = "/failure";
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4">
          {loading ? "Verifying payment..." : message}
        </h1>
        {!loading && message.includes("Successful") && (
          <p className="text-gray-700 mt-2">
            You will be redirected to the home page shortly.
          </p>
        )}
        {!loading && message.includes("pending") && (
          <p className="text-gray-700 mt-2">Please do not close this page.</p>
        )}
        {!loading && message.includes("failed") && (
          <p className="text-red-600 mt-2 font-semibold">
            If the problem persists, contact support.
          </p>
        )}
      </div>
    </div>
  );
}
