import './styles/PerformanceRiskDetail.css';
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const PerformanceRiskDetail = ({ onBack, onResolve, onDismiss, isMobile }) => {
  return (
    <div className={isMobile ? 'prd-root-mobile' : 'prd-root-desktop'}>
      {/* Header */}
      <div className="prd-header-row">
        <button
          onClick={onBack}
          className="prd-back-btn"
        >
          <ArrowLeft style={{ width: '20px', height: '20px' }} />
        </button>
        <div className="prd-header-title-row">
          <div className="prd-header-dot" />
          <h1 className="prd-header-title">Contract Risk</h1>
        </div>
      </div>

      <div className="prd-subtitle">TechVendor Inc</div>

      {/* Risk Description */}
      <div className="prd-card">
        <h2 className="prd-card-title">Risk Description</h2>
        <p className="prd-card-desc">
          Payment Gateway's API response time has degraded by 15% over the past 48 hours, affecting customer transaction experience and potentially impacting revenue.
        </p>
      </div>

      {/* AI Recommendations */}
      <div className="prd-card">
        <h2 className="prd-card-title">AI Recommendations</h2>
        <div className="prd-recommend-list">
          {[
            'Escalate to Payment Gateway technical team immediately',
            'Activate backup payment processor if degradation continues',
            'Monitor customer complaint channels for transaction issues',
            'Review SLA penalties and potential compensation claims'
          ].map((recommendation, index) => (
            <div key={index} className="prd-recommend-item">
              <div className="prd-recommend-check"><span>✓</span></div>
              <span className="prd-recommend-text">{recommendation}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout for Timeline and Stakeholders */}
      <div className="prd-grid">
        {/* Timeline */}
        <div className="prd-card">
          <h2 className="prd-card-title">Timeline</h2>
          <p className="prd-card-desc">Review needed within 30 days</p>
        </div>
        {/* Key Stakeholders */}
        <div className="prd-card">
          <h2 className="prd-card-title">Key Stakeholders</h2>
          <ul className="prd-stakeholder-list">
            {['IT Operations', 'Customer Service', 'Business Comunity'].map((stakeholder, index) => (
              <li key={index} className="prd-stakeholder-item">
                <span className="prd-stakeholder-dot" />
                {stakeholder}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="prd-action-row">
        <button
          onClick={onResolve}
          className="prd-action-btn prd-action-btn-primary"
        >
          Mark as Resolved
        </button>
        <button
          onClick={onDismiss}
          className="prd-action-btn prd-action-btn-secondary"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default PerformanceRiskDetail;