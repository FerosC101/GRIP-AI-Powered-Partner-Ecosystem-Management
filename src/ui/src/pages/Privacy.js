// src/pages/Privacy.js
import React from "react";

const Privacy = () => {
  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px" }}>
        Privacy Policy
      </h1>
      <p>
        Grip respects your privacy and is committed to protecting your personal
        data. This policy explains how we collect, use, and safeguard your
        information.
      </p>

      <h2 style={{ marginTop: "20px", fontSize: "20px", fontWeight: "600" }}>
        1. Information We Collect
      </h2>
      <p>
        We may collect information you provide, such as your name, email, and
        company details, as well as usage data when you interact with the
        platform.
      </p>

      <h2 style={{ marginTop: "20px", fontSize: "20px", fontWeight: "600" }}>
        2. How We Use Information
      </h2>
      <p>
        We use your data to provide services, improve functionality, and ensure
        security. We do not sell your personal data to third parties.
      </p>

      <h2 style={{ marginTop: "20px", fontSize: "20px", fontWeight: "600" }}>
        3. Data Security
      </h2>
      <p>
        We implement security measures to protect your data but cannot guarantee
        absolute protection from cyber threats.
      </p>

      <h2 style={{ marginTop: "20px", fontSize: "20px", fontWeight: "600" }}>
        4. Your Rights
      </h2>
      <p>
        You may request access, correction, or deletion of your personal data at
        any time by contacting our support team.
      </p>
    </div>
  );
};

export default Privacy;
