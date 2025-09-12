import React, { useState } from 'react';
import Opportunities from './pages/OpportunitiesNew';
import InvestorDashboard from './InvestorDashboard';
import ContractAnalyzer from './ContractAnalyzer';
import Homepage from './Homepage';
import AuthPages from './pages/AuthPages.js'; 
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import { Route, Routes } from 'react-router-dom';


const App = () => {
  const [currentView, setCurrentView] = useState('auth'); // Start with auth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  // --- Authentication Handlers ---
  const handleLogin = (loginData) => {
    console.log("Login successful:", loginData);
    setIsAuthenticated(true);
    setCurrentView('homepage');
  };

  const handleRegister = (registerData) => {
    console.log("Registration successful:", registerData);
    setIsAuthenticated(true);
    setCurrentView('homepage');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('auth');
    setAnalysisData(null);
    setSelectedOpportunity(null);
  };

  // --- Navigation Handlers ---
  const handleAnalyze = (opportunityData) => {
    console.log("App received analysisData:", opportunityData);
    setAnalysisData(opportunityData);
    setCurrentView('dashboard');
  };

  const handleBackToOpportunities = () => {
    setCurrentView('opportunities');
    setAnalysisData(null);
  };

  const handleContractStrategist = () => {
    setCurrentView('contract-strategist');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleGoToOpportunities = () => {
    setCurrentView('opportunities');
  };

  // --- Render Views ---
  return (
    <>
      {/* Show Auth Pages First */}
      {currentView === 'auth' && (
        <>
        <AuthPages 
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
        {/* <Routes>
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes> */}
        </>
      )}

      {/* Protected Routes - Only show if authenticated */}
      {isAuthenticated && currentView === 'homepage' && (
        <Homepage 
          onGoToOpportunities={handleGoToOpportunities}
          onLogout={handleLogout}
        />
      )}

      {isAuthenticated && currentView === 'opportunities' && (
        <Opportunities 
          isMobile={false} 
          onAnalyze={handleAnalyze}
          onLogout={handleLogout}
        />
      )}

      {isAuthenticated && currentView === 'dashboard' && (
        <InvestorDashboard 
          initialData={analysisData} 
          onBack={handleBackToOpportunities}
          onNavigateToContractStrategist={handleContractStrategist}
          onLogout={handleLogout}
        />
      )}

      {isAuthenticated && currentView === 'contract-strategist' && (
        <ContractAnalyzer 
          onBack={handleBackToDashboard}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default App;