import './styles/Partners.css';
import React, { useState } from 'react';
import { Search, Filter, ChevronRight, X, CheckCircle, Lightbulb } from 'lucide-react';

const Partners = ({ isMobile = true }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const partnersData = [
    {
      id: 1,
      name: 'Globe Telecom',
      type: 'Fintech Partner',
      trustScore: 94,
      engagementScore: 94,
      riskLevel: 'Low',
      opportunities: 3,
      color: '#10b981',
      contributions: '85%',
      recentActivities: [
        { type: 'success', title: 'Contract Renewed Successfully', time: '2 days ago' },
        { type: 'opportunity', title: 'New Opportunity Identified', time: '1 week ago' }
      ]
    },
    {
      id: 2,
      name: 'Ayala Healthcare',
      type: 'Group Company',
      trustScore: 98,
      riskLevel: 'Low',
      opportunities: 5,
      color: '#3b82f6',
      contributions: '92%',
      recentActivities: [
        { type: 'success', title: 'Quarterly Review Completed', time: '1 day ago' },
        { type: 'opportunity', title: 'Expansion Opportunity', time: '3 days ago' }
      ]
    },
    {
      id: 3,
      name: 'TechVendor Inc',
      type: 'IT Vendor',
      trustScore: 78,
      riskLevel: 'Medium',
      opportunities: 1,
      color: '#f59e0b',
      contributions: '67%',
      recentActivities: [
        { type: 'opportunity', title: 'Service Improvement Required', time: '5 days ago' }
      ]
    },
    {
      id: 4,
      name: 'Regulatory Corp',
      type: 'Compliance Partner',
      trustScore: 88,
      riskLevel: 'Low',
      opportunities: 2,
      color: '#8b5cf6',
      contributions: '78%',
      recentActivities: [
        { type: 'success', title: 'Compliance Audit Passed', time: '1 week ago' }
      ]
    }
  ];

  const filteredPartners = partnersData.filter(partner =>
    partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    partner.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'High': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const PartnerCard = ({ partner }) => (
    <div 
      className="partners-card"
      onClick={() => setSelectedPartner(partner)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px 0 rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0, 0, 0, 0.1)';
      }}
    >
      <div className="partners-card-main">
        <div className="partners-card-header">
          <div className="partners-card-dot" style={{ backgroundColor: partner.color }} />
          <h3 className="partners-card-title">{partner.name}</h3>
        </div>
        <p className="partners-card-type">{partner.type}</p>
        <div className="partners-card-metrics">
          <div>
            <p className="partners-card-metric-label">
              {partner.engagementScore ? 'Engagement Score' : 'Trust Score'}
            </p>
            <p className="partners-card-metric-value">
              {partner.engagementScore || partner.trustScore}
            </p>
          </div>
          <div>
            <p className="partners-card-metric-label">Risk Level</p>
            <p className="partners-card-metric-value" style={{ color: getRiskColor(partner.riskLevel) }}>
              {partner.riskLevel}
            </p>
          </div>
          <div>
            <p className="partners-card-metric-label">Opportunities</p>
            <p className="partners-card-metric-value" style={{ color: '#8b5cf6' }}>{partner.opportunities}</p>
          </div>
        </div>
      </div>
      <ChevronRight size={20} color="#d1d5db" />
    </div>
  );

  const PartnerModal = ({ partner }) => (
    <div className="partners-modal-overlay">
      <div className="partners-modal">
        <button
          onClick={() => setSelectedPartner(null)}
          className="partners-modal-close"
        >
          <X size={24} color="#6b7280" />
        </button>

        <div className="partners-modal-header">
          <div className="partners-modal-header-row">
            <div className="partners-modal-dot" style={{ backgroundColor: partner.color }} />
            <h2 className="partners-modal-title">{partner.name}</h2>
          </div>
          <p className="partners-modal-type">{partner.type}</p>
        </div>

        <div className="partners-modal-metrics-row">
          <div className="partners-modal-metric">
            <p className="partners-modal-metric-label">Trust Score</p>
            <p className="partners-modal-metric-value">{partner.trustScore}</p>
          </div>
          <div className="partners-modal-metric">
            <p className="partners-modal-metric-label">Contributions</p>
            <p className="partners-modal-metric-value">{partner.contributions}</p>
          </div>
        </div>

        <div className="partners-modal-activities">
          <h3 className="partners-modal-activities-title">Recent Activities</h3>
          <div className="partners-modal-activities-list">
            {partner.recentActivities.map((activity, index) => (
              <div key={index} className="partners-modal-activity-item">
                {activity.type === 'success' ? (
                  <CheckCircle size={20} color="#10b981" />
                ) : (
                  <Lightbulb size={20} color="#f59e0b" />
                )}
                <div className="partners-modal-activity-content">
                  <p className="partners-modal-activity-title">{activity.title}</p>
                  <p className="partners-modal-activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="partners-modal-actions-row">
          <button className="partners-modal-action-btn partners-modal-action-btn-primary">
            View Contract
          </button>
          <button className="partners-modal-action-btn partners-modal-action-btn-secondary">
            Simulate Impact
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={isMobile ? 'partners-root-mobile' : 'partners-root-desktop'}>
      {/* Mobile Header */}
      {isMobile && (
        <div className="partners-mobile-header">
          <div className="partners-mobile-logo-row">
            <img 
              src="/logo.png" 
              alt="Grip Logo"
              className="partners-mobile-logo"
            />
            <span className="partners-mobile-logo-text">Grip</span>
          </div>
        </div>
      )}

      <h1 className="partners-header-title">Partners Page</h1>

      {/* Search and Filter */}
      <div className="partners-search-row">
        <div className="partners-search-input-wrapper">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="partners-search-input"
          />
          <Search
            size={18}
            color="#9ca3af"
            className="partners-search-icon"
          />
        </div>
        <button 
          onClick={() => setShowFilter(!showFilter)}
          className={showFilter ? 'partners-filter-btn partners-filter-btn-active' : 'partners-filter-btn'}
        >
          <Filter size={18} color="#6b7280" />
        </button>
      </div>

      {/* Partners List */}
      <div className="partners-list">
        {filteredPartners.map(partner => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>

      {filteredPartners.length === 0 && (
        <div className="partners-empty">
          <p>No partners found matching your search.</p>
        </div>
      )}

      {/* Partner Detail Modal */}
      {selectedPartner && <PartnerModal partner={selectedPartner} />}
    </div>
  );
};

export default Partners;