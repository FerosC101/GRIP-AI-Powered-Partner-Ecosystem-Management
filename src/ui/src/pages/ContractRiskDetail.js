import './styles/ContractRiskDetail.css';
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const ContractRiskDetail = ({ onBack, onResolve, onDismiss, isMobile }) => {
  return (
    <div className={isMobile ? 'crd-root-mobile' : 'crd-root-desktop'}>
      {/* Header */}
      <div className="crd-header-row">
        <button
          onClick={onBack}
          className="crd-back-btn"
        >
          <ArrowLeft style={{ width: '20px', height: '20px' }} />
        </button>
        <div className="crd-header-title-row">
          <div className="crd-header-dot" />
          <h1 className="crd-header-title">Contract Risk</h1>
        </div>
      </div>

      <div className="crd-subtitle">TechVendor Inc</div>

      {/* Risk Description */}
      <div className="crd-card">
        <h2 className="crd-card-title">Risk Description</h2>
        <p className="crd-card-desc">
          The ESG compliance clause in the TechVendor Inc contract references outdated sustainability standards that no longer align with current regulatory requirements and BPI's updated ESG framework.
        </p>
      </div>

      {/* AI Recommendations */}
      <div className="crd-card">
        <h2 className="crd-card-title">AI Recommendations</h2>
        <div className="crd-recommend-list">
          {[
            'Update ESG clause to reference ISO 14001:2015 standards',
            'Include carbon neutrality commitment by 2030',
            'Add quarterly ESG reporting requirements',
            'Implement penalty structure for non-compliance'
          ].map((recommendation, index) => (
            <div key={index} className="crd-recommend-item">
              <div className="crd-recommend-check"><span>✓</span></div>
              <span className="crd-recommend-text">{recommendation}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout for Timeline and Stakeholders */}
      <div className="crd-grid">
        {/* Timeline */}
        <div className="crd-card">
          <h2 className="crd-card-title">Timeline</h2>
          <p className="crd-card-desc">Review needed within 30 days</p>
        </div>
        {/* Key Stakeholders */}
        <div className="crd-card">
          <h2 className="crd-card-title">Key Stakeholders</h2>
          <ul className="crd-stakeholder-list">
            {['Legal Team', 'Sustainability Officer', 'Vendor Manager'].map((stakeholder, index) => (
              <li key={index} className="crd-stakeholder-item">
                <span className="crd-stakeholder-dot" />
                {stakeholder}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="crd-action-row">
        <button
          onClick={onResolve}
          className="crd-action-btn crd-action-btn-primary"
        >
          Mark as Resolved
        </button>
        <button
          onClick={onDismiss}
          className="crd-action-btn crd-action-btn-secondary"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
};

export default ContractRiskDetail;