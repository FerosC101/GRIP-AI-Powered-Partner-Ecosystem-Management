// src/pages/Terms.js
import React from "react";

const Terms = () => {
  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>
        Terms of Service
      </h1>
      <p>
        Welcome to Grip! By using our platform, you agree to the following terms
        and conditions. Please read carefully.
      </p>

      <h2 style={{ marginTop: "20px", fontSize: "20px", fontWeight: "600" }}>
        1. Use of Service
      </h2>
      <p>
        You agree to use Grip only for lawful purposes and in compliance with all
        applicable laws and regulations.
      </p>

      <h2 style={{ marginTop: "20px", fontSize: "20px", fontWeight: "600" }}>
        2. Accounts
      </h2>
      <p>
        You are responsible for maintaining the confidentiality of your account
        and all activities under your account.
      </p>

      <h2 style={{ marginTop: "20px", fontSize: "20px", fontWeight: "600" }}>
        3. Limitations
      </h2>
      <p>
        Grip is not liable for damages resulting from interruptions, data loss,
        or unauthorized access to your account.
      </p>

      <h2 style={{ marginTop: "20px", fontSize: "20px", fontWeight: "600" }}>
        4. Changes
      </h2>
      <p>
        We may update these terms at any time. Continued use of the platform
        means you accept the updated terms.
      </p>
    </div>
  );
};

export default Terms;
