import React, { useState, useRef } from 'react';
import { Send, FileText, TrendingUp, AlertCircle, CheckCircle, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import './styles/ContractStrategist.css';

// Contract Strategist Main Component
const ContractStrategist = ({ isMobile, onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your Contract Strategist AI. I can help you analyze contracts, identify risks, suggest improvements, and optimize partnership terms. What would you like to work on today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // New states for upload modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisQuestion, setAnalysisQuestion] = useState('');

  // persistent session info returned by backend after upload
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [activeFileName, setActiveFileName] = useState(null);

  const contractAnalytics = [
    { label: 'Active Contracts', value: '127', trend: '+5', color: '#10b981' },
    { label: 'Pending Reviews', value: '23', trend: '-3', color: '#f59e0b' },
    { label: 'Risk Alerts', value: '8', trend: '+2', color: '#ef4444' },
    { label: 'Avg Score', value: '89.5', trend: '+1.2', color: '#6366f1' }
  ];

  const quickActions = [
    { icon: FileText, label: 'Analyze New Contract', action: 'analyze' },
    { icon: AlertCircle, label: 'Review Risk Alerts', action: 'risks' },
    { icon: TrendingUp, label: 'Optimization Report', action: 'optimize' },
    { icon: CheckCircle, label: 'Compliance Check', action: 'compliance' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // send a plain question (uses session if present)
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);
    scrollToBottom();

    try {
      // POST question + session_id (if present) as JSON
      const payload = {
        question: newMessage.content,
        session_id: currentSessionId || null
      };

      const resp = await fetch('http://127.0.0.1:8002/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await resp.json();

      if (data.error) {
        setMessages(prev => [...prev, { id: Date.now()+1, type: 'ai', content: `Server error: ${data.error}`, timestamp: new Date().toLocaleTimeString() }]);
      } else {
        const text = typeof data.advice === 'string' ? data.advice : JSON.stringify(data.advice, null, 2);
        if (data.session_id) setCurrentSessionId(data.session_id);
        if (data.filename) setActiveFileName(data.filename);

        setMessages(prev => [...prev, { id: Date.now()+1, type: 'ai', content: text, timestamp: new Date().toLocaleTimeString() }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now()+1, type: 'ai', content: `Network error: ${err.message}`, timestamp: new Date().toLocaleTimeString() }]);
    } finally {
      setIsTyping(false);
      scrollToBottom();
    }
  };

  // Modified: if analyze action -> open upload modal
  const handleQuickAction = (action) => {
    if (action === 'analyze') {
      setShowUploadModal(true);
      setAnalysisQuestion('');
      setSelectedFile(null);
      return;
    }

    const actionMessages = {
      risks: "Please review the current risk alerts and provide recommendations.",
      optimize: "Can you generate an optimization report for our contract portfolio?",
      compliance: "I need to run a compliance check on our active contracts."
    };

    setInputValue(actionMessages[action] || '');
  };

  // New: analyze contract by uploading file -> returns session_id that becomes persistent
  const analyzeContract = async () => {
    if (!selectedFile) {
      alert("Please select a PDF contract file to analyze.");
      return;
    }

    // Build form data
    const formData = new FormData();
    formData.append('question', analysisQuestion || "Please analyze this contract for risks and opportunities.");
    formData.append('pdf_file', selectedFile, selectedFile.name);

    try {
      setShowUploadModal(false);
      setIsTyping(true);

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          type: 'user',
          content: `Uploaded contract: ${selectedFile.name}\nQuestion: ${analysisQuestion || '(no question)'}`,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
      scrollToBottom();

      // POST to backend - backend returns advice and session_id
      const resp = await fetch('http://127.0.0.1:8002/ask', {
        method: 'POST',
        body: formData
      });

      const data = await resp.json();

      if (data.error) {
        setMessages(prev => [
          ...prev,
          { id: Date.now()+1, type: 'ai', content: `Server error: ${data.error}`, timestamp: new Date().toLocaleTimeString() }
        ]);
      } else {
        const adviceText = typeof data.advice === 'string' ? data.advice : JSON.stringify(data.advice, null, 2);

        // store session id so future questions reuse this pdf
        if (data.session_id) {
          setCurrentSessionId(data.session_id);
        }
        if (data.filename) {
          setActiveFileName(data.filename);
        } else {
          setActiveFileName(selectedFile.name);
        }

        setMessages(prev => [
          ...prev,
          { id: Date.now()+1, type: 'ai', content: adviceText, timestamp: new Date().toLocaleTimeString() }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { id: Date.now()+1, type: 'ai', content: `Network or server error: ${err.message}`, timestamp: new Date().toLocaleTimeString() }
      ]);
    } finally {
      setIsTyping(false);
      scrollToBottom();
    }
  };

  // Allow replacing the active contract (clears session info and opens upload modal)
  const replaceActiveContract = () => {
    setShowUploadModal(true);
    setSelectedFile(null);
    setAnalysisQuestion('');
    setActiveFileName(null);
  };

  return (
    <div style={{
      flex: 1,
      padding: isMobile ? '16px 16px 80px 16px' : '16px',
      height: isMobile ? 'calc(100vh - 160px)' : 'calc(100vh - 200px)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div className="cs-header-row">
        {onBack && (
          <button
            onClick={onBack}
            className="cs-back-btn"
          >
            <ArrowLeft style={{ width: '20px', height: '20px' }} />
          </button>
        )}
        <div>
          <h1 className="cs-header-title">Contract Strategist</h1>
          <p className="cs-header-desc">Your AI-powered contract analysis assistant</p>
        </div>
      </div>
      {/* Upload Contract/Active File Indicator*/}
      <div className="cs-upload-row">
        {activeFileName ? (
          <div className="cs-upload-active-file">
            <FileText style={{ width: '18px', height: '18px', color: '#ea580c' }} />
            <div className="cs-upload-active-file-name">{activeFileName}</div>
            <button onClick={replaceActiveContract} className="cs-upload-replace-btn">Replace</button>
          </div>
        ) : (
          <button onClick={() => setShowUploadModal(true)} className="cs-upload-btn">
            Upload Contract
          </button>
        )}
      </div>

      {/* Analytics Cards */}
      {!isMobile && (
        <div className="cs-analytics-grid">
          {contractAnalytics.map((metric, index) => (
            <div key={index} className="cs-analytics-card">
              <div className="cs-analytics-value">{metric.value}</div>
              <div className="cs-analytics-label">{metric.label}</div>
              <div className="cs-analytics-trend-row">
                <ArrowRight style={{ 
                  width: '12px', 
                  height: '12px', 
                  color: metric.color,
                  transform: metric.trend.startsWith('+') ? 'rotate(-45deg)' : 'rotate(45deg)'
                }} />
                <span style={{ fontSize: '12px', color: metric.color, fontWeight: '500' }}>{metric.trend}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Chat Container */}
      <div className="cs-chat-container">
        {/* Quick Actions */}
        <div className="cs-quick-actions-row">
          <div className={isMobile ? "cs-quick-actions-grid-mobile" : "cs-quick-actions-grid-desktop"}>
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className="cs-quick-action-btn"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#e2e8f0';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f8fafc';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <IconComponent style={{ width: '20px', height: '20px', color: '#ea580c' }} />
                  <span className="cs-quick-action-label">{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Messages */}
        <div className="cs-messages-list">
          {messages.map((message) => (
            <div key={message.id} className={`cs-message-row ${message.type === 'user' ? 'cs-message-row-user' : 'cs-message-row-ai'}`}>
              <div className={`cs-message-bubble ${message.type === 'user' ? 'cs-message-bubble-user' : 'cs-message-bubble-ai'}`}>
                <div className="cs-message-content">{message.content}</div>
                <div className="cs-message-timestamp">{message.timestamp}</div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="cs-message-row cs-message-row-ai">
              <div className="cs-message-bubble cs-message-bubble-ai">
                <div className="cs-typing-indicator">
                  <div className="cs-typing-dot"></div>
                  <div className="cs-typing-dot cs-typing-dot2"></div>
                  <div className="cs-typing-dot cs-typing-dot3"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="cs-input-row">
          <div className="cs-input-inner-row">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={currentSessionId ? "Ask about the uploaded contract..." : "Ask about contracts or upload one to use as context..."}
              className="cs-input-textarea"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className={`cs-input-send-btn${!inputValue.trim() ? ' cs-input-send-btn-disabled' : ''}`}
            >
              <Send style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Upload modal*/}
      {showUploadModal && (
        <div className="cs-upload-modal-overlay">
          <div className="cs-upload-modal">
            <div className="cs-upload-modal-header">
              <h3 style={{ margin: 0 }}>Analyze New Contract</h3>
              <button onClick={() => setShowUploadModal(false)} className="cs-upload-modal-close">✕</button>
            </div>
            <label className="cs-upload-label">
              Select PDF contract
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="cs-upload-input"
              />
            </label>
            <label className="cs-upload-label" style={{ marginBottom: '12px' }}>
              Short question / context (optional)
              <textarea
                value={analysisQuestion}
                onChange={(e) => setAnalysisQuestion(e.target.value)}
                placeholder="e.g., 'Focus on termination and liability clauses.'"
                className="cs-upload-textarea"
              />
            </label>
            <div className="cs-upload-modal-actions">
              <button onClick={() => setShowUploadModal(false)} className="cs-upload-cancel-btn">Cancel</button>
              <button onClick={analyzeContract} className="cs-upload-analyze-btn">Analyze</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.3; }
          40% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ContractStrategist;
