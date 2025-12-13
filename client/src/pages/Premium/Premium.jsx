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

  const premiumFeatures = [
    "Access to exclusive recipes",
    "No ads experience",
    "Priority support",
    "Advanced meal planning tools",
    "Custom ingredient suggestions",
  ];

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-50">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Premium Subscription</h1>
        <p className="text-gray-700 mb-6">
          Unlock premium features and take your cooking experience to the next level!
        </p>

        <ul className="text-left mb-6 space-y-2">
          {premiumFeatures.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 text-sm font-bold">
                ✓
              </span>
              <span className="text-gray-800">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleKhaltiPayment}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : "Pay with Khalti"}
        </button>
      </div>
    </div>
  );
}
