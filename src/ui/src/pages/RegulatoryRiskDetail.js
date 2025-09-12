import './styles/RegulatoryRiskDetail.css';
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const RegulatoryRiskDetail = ({ onBack, onResolve, onDismiss, isMobile }) => {
  return (
    <div className={isMobile ? 'rrd-root-mobile' : 'rrd-root-desktop'}>
      {/* Header */}
      <div className="rrd-header-row">
        <button
          onClick={onBack}
          className="rrd-back-btn"
        >
          <ArrowLeft style={{ width: '20px', height: '20px' }} />
        </button>
        <div className="rrd-header-title-row">
          <div className="rrd-header-dot" />
          <h1 className="rrd-header-title">Contract Risk</h1>
        </div>
      </div>

      <div className="rrd-subtitle">TechVendor Inc</div>

      {/* Risk Description */}
      <div className="rrd-card">
        <h2 className="rrd-card-title">Risk Description</h2>
        <p className="rrd-card-desc">
          New BSP circular on digital banking partnerships requires additional compliance measures that affect our agreements with FinTech Solutions, Digital Wallet Pro, and Crypto Exchange Partner.
        </p>
      </div>

      {/* AI Recommendations */}
      <div className="rrd-card">
        <h2 className="rrd-card-title">AI Recommendations</h2>
        <div className="rrd-recommend-list">
          {[
            'Convene emergency compliance committee meeting',
            'Assess contract modifications needed for each affected partner',
            'Prepare compliance timeline and resource allocation',
            'Communicate changes to affected partners within 72 hours'
          ].map((recommendation, index) => (
            <div key={index} className="rrd-recommend-item">
              <div className="rrd-recommend-check"><span>✓</span></div>
              <span className="rrd-recommend-text">{recommendation}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout for Timeline and Stakeholders */}
      <div className="rrd-grid">
        {/* Timeline */}
        <div className="rrd-card">
          <h2 className="rrd-card-title">Timeline</h2>
          <p className="rrd-card-desc">Compliance deadline: 45 days</p>
        </div>
        {/* Key Stakeholders */}
        <div className="rrd-card">
          <h2 className="rrd-card-title">Key Stakeholders</h2>
          <ul className="rrd-stakeholder-list">
            {['Legal Team', 'Sustainability Officer', 'Vendor Manager'].map((stakeholder, index) => (
              <li key={index} className="rrd-stakeholder-item">
                <span className="rrd-stakeholder-dot" />
                {stakeholder}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="rrd-action-row">
        <button
          onClick={onResolve}
          className="rrd-action-btn rrd-action-btn-primary"
        >
          Mark as Resolved
        </button>
        <button
          onClick={onDismiss}
          className="rrd-action-btn rrd-action-btn-secondary"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default RegulatoryRiskDetail;