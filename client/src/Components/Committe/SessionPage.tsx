import React, { useState, useEffect } from 'react';
import './SessionPage.css';

interface Session {
  id: string;
  title: string;
  link: string;
  description: string;
  date: string;
  headName: string;
  section: string;
}

interface CommitteePageProps {
  setPage: (page: string) => void;
  sessions: Session[];
}

const CommitteePage: React.FC<CommitteePageProps> = ({ setPage, sessions }) => {
  const [allSessions, setAllSessions] = useState<Session[]>(sessions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await fetch('/api/sessions');
        if (!response.ok) throw new Error('Failed to fetch sessions');
        
        const data = await response.json();
        setAllSessions(data);
      } catch (err) {
        setError('Failed to load sessions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const startSession = (sessionId: string) => {
    // In a real app, this would navigate to the session page
    alert(`Starting session: ${sessionId}`);
    // setPage('sessionPage', sessionId);
  };

  const viewAttendance = (sessionId: string) => {
    // In a real app, this would show attendance details
    alert(`Viewing attendance for: ${sessionId}`);
    // setPage('attendancePage', sessionId);
  };

  if (loading) return <div className="loading">Loading sessions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="committee-page">
      <header className="committee-header">
        <div className="container">
          <div className="header-content">
            <h1>Committee</h1>
            <Button variant="secondary" onClick={() => setPage('createSession')}>
              + Create Session
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container">
        <div className="committee-grid">
          {/* Sessions List */}
          <div className="sessions-list">
            <h2 className="section-title">Sessions</h2>
            
            <div className="sessions-container">
              {allSessions.map((session) => (
                <div 
                  key={session.id} 
                  className={`session-card ${session.id === 'highlighted' ? 'highlighted' : ''}`}
                >
                  <h3>{session.title}</h3>
                  
                  <div className="session-details">
                    <p><strong>Head:</strong> {session.headName}</p>
                    <p><strong>Section:</strong> {session.section}</p>
                    <p><strong>Date:</strong> {session.date}</p>
                    <p><strong>Description:</strong> {session.description}</p>
                  </div>
                  
                  <div className="session-actions">
                    <Button 
                      variant="primary" 
                      onClick={() => startSession(session.id)}
                    >
                      Start Session
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Attendance Table */}
          <div className="attendance-section">
            <div className="attendance-card">
              <h2 className="section-title">Attendance Table</h2>
              
              <div className="attendance-list">
                {allSessions.map((session) => (
                  <div key={session.id} className="attendance-item">
                    <span className="session-title">{session.title}</span>
                    <Button 
                      variant="primary" 
                      onClick={() => viewAttendance(session.id)}
                    >
                      View Table
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Button Component
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary' }) => {
  const buttonClass = variant === 'secondary' 
    ? 'button-secondary' 
    : 'button-primary';
    
  return (
    <button onClick={onClick} className={`button ${buttonClass}`}>
      {children}
    </button>
  );
};

export default CommitteePage;