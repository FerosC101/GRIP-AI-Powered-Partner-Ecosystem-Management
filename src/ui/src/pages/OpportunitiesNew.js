import './styles/OpportunitiesNew.css';
import React, {useState} from "react";
import InvestorDashboard from "../InvestorDashboard";

const Opportunities = ({ isMobile, onAnalyze }) => {
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const opportunities = [
    {
      id: 1,
      title: "Instant health loans",
      priority: "High Priority",
      priorityColor: "#f97316",
      projectedROI: "340%",
      timeline: "6 months",
      partners: ["Ayala Healthcare", "Globe Telecom"],
      confidence: "93%",
      profileText:
        "Healthcare fintech startup providing instant medical loans to underserved populations. Uses AI for credit scoring and partners with major healthcare providers. Strong growth trajectory with 40% month-over-month user acquisition.",
      transactionsFile: "health-loans-transactions.csv",
      paymentsFile: "health-loans-payments.csv",
    },
    {
      id: 2,
      title: "Climate-based Insurance",
      priority: "Medium Priority",
      priorityColor: "#eab308",
      projectedROI: "185%",
      timeline: "8 months",
      partners: ["Weather Analytics", "AgriTech Corp"],
      confidence: "78%",
      profileText:
        "Insurtech company offering climate-risk insurance for farmers and small businesses. Uses satellite data and weather analytics for precise risk assessment. Growing demand due to climate change impacts.",
      transactionsFile: "climate-insurance-transactions.csv",
      paymentsFile: "climate-insurance-payments.csv",
    },
    {
      id: 3,
      title: "Rural MSMEs Cash Flow",
      priority: "High Priority",
      priorityColor: "#f97316",
      projectedROI: "185%",
      timeline: "6 months",
      partners: ["AgriTech Corp", "Rural Bank Network"],
      confidence: "78%",
      profileText:
        "Fintech platform providing working capital loans to rural micro, small and medium enterprises. Focus on agricultural supply chain financing with digital-first approach and alternative credit scoring.",
      transactionsFile: "rural-msmes-transactions.csv",
      paymentsFile: "rural-msmes-payments.csv",
    },
  ];

if (selectedOpportunity) {
  return (
    <div style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
      <InvestorDashboard
        initialData={selectedOpportunity}
        onBack={() => setSelectedOpportunity(null)}
      />
    </div>
  );
}



  // const handleAnalyze = (opportunity) => {
  //   const payload = {
  //     profileText: opportunity.profileText,
  //     transactionsFile: opportunity.transactionsFile,
  //     paymentsFile: opportunity.paymentsFile,
  //     title: opportunity.title,
  //   };

  //   console.log("Opportunities -> onAnalyze payload:", payload);

  //   if (onAnalyze) {
  //     onAnalyze(payload);  // ✅ This will go back to App.js
  //   } else {
  //     console.warn("onAnalyze prop is not provided");
  //   }
  // };

  console.log("✅ Opportunities component mounted");
  console.log("onAnalyze prop received:", onAnalyze);

 return (
  <div className={isMobile ? 'opp-root-mobile' : 'opp-root-desktop'}>
    {isMobile && (
      <div className="opp-mobile-header">
        <div className="opp-mobile-logo-row">
          <img
            src="/logo.png"
            alt="Grip Logo"
            className="opp-mobile-logo"
          />
          <span className="opp-mobile-logo-text">Grip</span>
        </div>
      </div>
    )}

    {/* Page Header */}
    <div className="opp-header-row">
      <h1 className="opp-header-title">
        AI-Discovered Opportunities
      </h1>
      <p className="opp-header-count">
        {opportunities.length} Active
      </p>
    </div>

    {/* Cards */}
    <div className="opp-cards-list">
      {opportunities.map((opportunity) => (
        <div
          key={opportunity.id}
          className="opp-card"
        >
          {/* Title + Priority */}
          <div className="opp-card-title-row">
            <h2 className="opp-card-title">{opportunity.title}</h2>
            <span className="opp-card-priority" style={{ backgroundColor: opportunity.priorityColor }}>
              {opportunity.priority}
            </span>
          </div>

          {/* Metrics */}
          <div className="opp-card-metrics-row">
            <div>
              <p className="opp-card-metric-label">Projected ROI</p>
              <p className="opp-card-metric-value">{opportunity.projectedROI}</p>
            </div>
            <div>
              <p className="opp-card-metric-label">Timeline</p>
              <p className="opp-card-metric-value">{opportunity.timeline}</p>
            </div>
          </div>

          {/* Partners */}
          <div className="opp-card-partners-row">
            <p className="opp-card-partners-label">Key Partners</p>
            <div className="opp-card-partners-list">
              {opportunity.partners.map((partner, idx) => (
                <span
                  key={idx}
                  className="opp-card-partner-badge"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="opp-card-footer-row">
            <div className="opp-card-confidence-row">
              <div className="opp-card-confidence-dot" />
              <span className="opp-card-confidence-label">
                Confidence: {opportunity.confidence}
              </span>
            </div>
            <button
              className="opp-card-analyze-btn"
              onClick={() => setSelectedOpportunity(opportunity)}
            >
              Analyze
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Opportunities;
