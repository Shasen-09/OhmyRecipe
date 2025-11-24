import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Failure() {

  // Optional: Auto redirect back to Premium page in 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/premium";
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8d7da",
      padding: "20px"
    }}>
      <div style={{
        maxWidth: "500px",
        width: "100%",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>
        <h1 style={{ color: "#dc3545", marginBottom: "10px" }}>
          ❌ Payment Failed
        </h1>

        <p style={{ marginBottom: "20px", fontSize: "16px", color: "#555" }}>
          Unfortunately, we couldn't process your payment.<br />
          Please try again. You will be redirected shortly.
        </p>

        <Link to="/premium">
          <button style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            border: "none",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px"
          }}>
            Try Again
          </button>
        </Link>
      </div>
    </div>
  );
}
