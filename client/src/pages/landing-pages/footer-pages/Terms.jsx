// File: EthicalForms.jsx (React JavaScript - no TypeScript)
import React, { useState } from "react";
import NavBAr from "../../NavBAr";
import Footer from "../Footer";

const Terms = () => {
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically call an API or persist consent in the backend
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBAr />
      <div className="max-w-3xl mx-auto py-12 px-6 flex-1">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Ethical Forms & User Consent
        </h1>

        {/* Ethical Approval Summary */}
        <section className="mb-10 p-6 rounded-2xl shadow bg-white">
          <h2 className="text-2xl font-semibold mb-3">Ethical Approval Summary</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Study uses anonymized user data for testing.</li>
            <li>All data storage and processing complies with GDPR.</li>
            <li>No sensitive personal information is collected.</li>
          </ul>
        </section>

        {/* Risk Assessment */}
        <section className="mb-10 p-6 rounded-2xl shadow bg-white">
          <h2 className="text-2xl font-semibold mb-3">Risk Assessment</h2>
          <ul className="list-disc ml-6 text-gray-700 space-y-1">
            <li>Minimal risk: digital system testing only.</li>
            <li>Potential issue: accidental data leak.</li>
            <li>Mitigation: secure JWT authentication & encrypted storage.</li>
          </ul>
        </section>

        {/* User Consent Form */}
        <section className="p-6 rounded-2xl shadow bg-white">
          <h2 className="text-2xl font-semibold mb-3">User Consent Form</h2>
          <p className="text-gray-700 mb-4">
            "I agree to participate in testing the OH-MY-RECIPE system. I understand
            that my data will be used anonymously for research purposes."
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="flex items-center gap-3 text-gray-800">
              <input
                type="checkbox"
                checked={consent}
                onChange={() => setConsent(!consent)}
                className="w-5 h-5"
              />
              I agree to the terms stated above.
            </label>

            <button
              type="submit"
              disabled={!consent}
              className="bg-blue-600 text-white py-2 px-4 rounded-xl disabled:bg-gray-400"
            >
              Submit Consent
            </button>
          </form>

          {submitted && (
            <p className="mt-4 text-green-600 font-semibold">
              ✅ Thank you! Your consent has been recorded.
            </p>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
