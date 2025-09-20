import React, { useState, useEffect } from 'react';
import './CallConfirm.css';

interface RegistrationData {
  id: string;
  name: string;
  email: string;
  committee: string;
  description: string;
  interviewDate: string;
  interviewTime: string;
  interviewDuration: string;
  interviewLocation: string;
  interviewDescription: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const SubmittedRegistrationPage = () => {
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        // Get registration ID from URL params
        const params = new URLSearchParams(window.location.search);
        const regId = params.get('id');
        
        if (!regId) throw new Error('Registration ID not found');
        
        const response = await fetch(`/api/registrations/${regId}`);
        if (!response.ok) throw new Error('Failed to fetch registration');
        
        const data = await response.json();
        setRegistration(data);
      } catch (err) {
        setError(
          err && typeof err === 'object' && 'message' in err
            ? String((err as { message?: unknown }).message)
            : 'Failed to load registration'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRegistration();
  }, []);

  const updateStatus = async (newStatus: 'accepted' | 'rejected') => {
    if (!registration) return;
    
    try {
      const response = await fetch(`/api/registrations/${registration.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (!response.ok) throw new Error('Failed to update status');
      
      setRegistration(prev => prev ? { ...prev, status: newStatus } : null);
      setStatusMessage(`Status updated to ${newStatus}`);
      
      // Clear message after 3 seconds
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      setError(
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message?: unknown }).message)
          : 'Failed to update status'
      );
    }
  };

  const resendEmail = async () => {
    if (!registration) return;
    
    try {
      const response = await fetch(`/api/registrations/${registration.id}/resend-email`, {
        method: 'POST'
      });
      
      if (!response.ok) throw new Error('Failed to resend email');
      
      setStatusMessage('Email resent successfully');
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err) {
      setError(
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message?: unknown }).message)
          : 'Failed to resend email'
      );
    }
  };

  if (loading) return <div className="loading">Loading registration...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!registration) return <div className="error">Registration not found</div>;

  return (
    <div className="submitted-registration-page">
      <header className="registration-header">
        <div className="container">
          <h1>Submitted Registration</h1>
        </div>
      </header>
      
      <main className="container">
        <SectionTitle>Submitted Information</SectionTitle>
        
        <div className="registration-grid">
          {/* Left Column */}
          <div className="registration-column">
            <div className="form-field">
              <label>Name</label>
              <input 
                type="text" 
                readOnly 
                value={registration.name} 
                className="readonly-input"
              />
            </div>
            
            <div className="form-field">
              <label>Email</label>
              <input 
                type="text" 
                readOnly 
                value={registration.email} 
                className="readonly-input"
              />
            </div>
            
            <div className="form-field">
              <label>Committee</label>
              <input 
                type="text" 
                readOnly 
                value={registration.committee} 
                className="readonly-input"
              />
            </div>
          </div>
          
          {/* Right Column */}
          <div className="registration-column">
            <div className="form-field">
              <label>Description</label>
              <textarea 
                readOnly 
                rows={4} 
                value={registration.description} 
                className="readonly-textarea"
              />
            </div>
            
            <div className="interview-card">
              <div className="calendar-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="interview-time">
                  {registration.interviewDate} @ {registration.interviewTime} - {registration.interviewDuration}
                </p>
                <p className="interview-title">{registration.interviewDescription}</p>
                <p className="interview-location">{registration.interviewLocation}</p>
              </div>
            </div>
          </div>
        </div>
        
        {statusMessage && <div className="status-message success">{statusMessage}</div>}
        {error && <div className="status-message error">{error}</div>}
        
        <div className="action-buttons">
          <div className="status-buttons">
            <button 
              className={`status-button accept ${registration.status === 'accepted' ? 'active' : ''}`}
              onClick={() => updateStatus('accepted')}
            >
              Accepted
            </button>
            <button 
              className={`status-button reject ${registration.status === 'rejected' ? 'active' : ''}`}
              onClick={() => updateStatus('rejected')}
            >
              Rejected
            </button>
          </div>
          
          <button 
            className="resend-button"
            onClick={resendEmail}
          >
            Resend Email
          </button>
        </div>
      </main>
    </div>
  );
};

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h2 className="section-title">{children}</h2>
);

export default SubmittedRegistrationPage;