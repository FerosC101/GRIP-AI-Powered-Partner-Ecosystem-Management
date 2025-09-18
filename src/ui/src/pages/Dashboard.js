import React, { useState, useEffect } from 'react';
import InsightCard from 'src/ui/src/components/InsightCard';
import ToolCard from 'src/ui/src/components/ToolCard';
import StatCard from 'src/ui/src/components/StatCard';
import ContractStrategist from 'src/ui/src/pages/ContractStrategist';
import { logoutUser, getCurrentUserData } from 'src/services/authService';
import { auth } from 'src/firebase';
import {
  Home,
  Users,
  Target,
  AlertTriangle,
  Lightbulb,
  BarChart3,
  FileText,
  TrendingUp,
  LogOut,
  User
} from 'lucide-react';

const Dashboard = ({ isMobile, onNavigate }) => {
  const [showContractStrategist, setShowContractStrategist] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (auth.currentUser) {
        const result = await getCurrentUserData(auth.currentUser.uid);
        if (result.success) {
          setUserData(result.userData);
        }
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      onNavigate('landing');
    }
  };

  // Dashboard Header Component
  const DashboardHeader = () => {
    if (isMobile) {
      return (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px',
            backgroundColor: 'white',
            borderBottom: '1px solid #e5e7eb',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#f97316',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>G</div>
              <span style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#111827'
              }}>Grip</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              color: '#374151',
              fontSize: '14px',
              display: isMobile ? 'none' : 'block'
            }}>
              {userData?.companyName || 'User'}
            </span>
              <button
                  onClick={handleLogout}
                  style={{
                    padding: '8px',
                    backgroundColor: '#f3f4f6',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
      );
    }

    return (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#f97316',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px'
            }}>G</div>
            <span style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#111827'
            }}>Grip</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} color="#6b7280" />
              <span style={{ color: '#374151', fontSize: '14px' }}>
              {userData?.companyName || auth.currentUser?.email || 'User'}
            </span>
            </div>
            <button
                onClick={handleLogout}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#374151'
                }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
    );
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
    );
  }

  if (showContractStrategist) {
    return (
        <div>
          <DashboardHeader />
          <ContractStrategist
              isMobile={isMobile}
              onBack={() => setShowContractStrategist(false)}
          />
        </div>
    );
  }

  return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <DashboardHeader />

        <div style={{ flex: 1, padding: isMobile ? "0 16px 80px 16px" : "0 24px 24px 24px" }}>

          {/* Welcome Message */}
          {!isMobile && (
              <div style={{ marginBottom: '32px' }}>
                <h1 style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '8px'
                }}>
                  Welcome back{userData?.companyName ? `, ${userData.companyName}` : ''}!
                </h1>
                <p style={{
                  fontSize: '16px',
                  color: '#6b7280'
                }}>
                  Here's what's happening with your partner ecosystem today.
                </p>
              </div>
          )}

          {/* Mobile Header */}
          {isMobile && (
              <div style={{
                textAlign: 'center',
                marginBottom: '24px',
                padding: '0 16px'
              }}>
                <h1 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#111827',
                  marginBottom: '4px'
                }}>
                  Dashboard
                </h1>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  Partner ecosystem overview
                </p>
              </div>
          )}

          {/* Desktop Layout */}
          {!isMobile && (
              <div style={{ display: 'flex', gap: '32px', height: '100%' }}>
                {/* Left Column - Stats */}
                <div style={{ width: '50%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <StatCard title="Total Partners" value="127" isMobile={isMobile} />
                    <StatCard title="Avg Engagement Score" value="89.5" isMobile={isMobile} />
                    <StatCard title="Opportunities" value="24" isMobile={isMobile} />
                    <StatCard title="Risk Alerts" value="7" isMobile={isMobile} />
                  </div>
                </div>

                {/* Right Column - AI Insights & Tools */}
                <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* AI Insights */}
                  <div style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    border: '1px solid #f3f4f6'
                  }}>
                    <h2 style={{
                      fontSize: '20px',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '24px'
                    }}>AI Insights</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <InsightCard
                          icon={Lightbulb}
                          title="Ecosystem Simulator"
                          subtitle="Run what-if scenarios"
                      />
                      <InsightCard
                          icon={Target}
                          title="New Opportunity Detected"
                          subtitle="Combining Ayala Land + BPI Housing Loans"
                      />
                      <InsightCard
                          icon={TrendingUp}
                          title="Performance Trend"
                          subtitle="Partner engagement up 15% this month"
                      />
                    </div>
                  </div>

                  {/* Tools */}
                  <ToolCard
                      icon={BarChart3}
                      title="Ecosystem Simulator"
                      subtitle="Run what-if scenarios"
                  />
                  <ToolCard
                      icon={FileText}
                      title="Contract Strategist"
                      subtitle="Review and Optimize terms"
                      onClick={() => setShowContractStrategist(true)}
                  />
                </div>
              </div>
          )}

          {/* Mobile Layout */}
          {isMobile && (
              <div>
                {/* Stats Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '16px',
                  marginBottom: '24px'
                }}>
                  <StatCard title="Total Partners" value="127" isMobile={isMobile} />
                  <StatCard title="Avg Trust Score" value="89.5" isMobile={isMobile} />
                  <StatCard title="Opportunities" value="24" isMobile={isMobile} />
                  <StatCard title="Risk Alerts" value="7" isMobile={isMobile} />
                </div>

                {/* AI Insights */}
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  border: '1px solid #f3f4f6',
                  marginBottom: '24px'
                }}>
                  <h2 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '16px'
                  }}>AI Insights</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <InsightCard
                        icon={Lightbulb}
                        title="Ecosystem Simulator"
                        subtitle="Run what-if scenarios"
                    />
                    <InsightCard
                        icon={Target}
                        title="New Opportunity Detected"
                        subtitle="Combining Ayala Land + BPI Housing Loans"
                    />
                    <InsightCard
                        icon={TrendingUp}
                        title="Performance Boost"
                        subtitle="Partner engagement up 15%"
                    />
                  </div>
                </div>

                {/* Tools */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <ToolCard
                      icon={BarChart3}
                      title="Ecosystem Simulator"
                      subtitle="Run what-if scenarios"
                  />
                  <ToolCard
                      icon={FileText}
                      title="Contract Strategist"
                      subtitle="Review and Optimize terms"
                      onClick={() => setShowContractStrategist(true)}
                  />
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default Dashboard;