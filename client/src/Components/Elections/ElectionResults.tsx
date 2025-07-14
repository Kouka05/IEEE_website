import React, { useState, useEffect } from 'react';
import './ElectionResults.css';

interface Candidate {
  id: string;
  name: string;
  role: string;
  votes: number;
  percentage: number;
  imageUrl?: string;
}

interface ElectionResultsPageProps {
  setPage: (page: string, candidateId?: string) => void;
}

const ElectionResultsPage: React.FC<ElectionResultsPageProps> = ({ setPage }) => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [electionTitle, setElectionTitle] = useState('');
  const [totalVotes, setTotalVotes] = useState(0);
  const [turnout, setTurnout] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Fetch election results from backend
        const response = await fetch('/api/elections/results');
        if (!response.ok) throw new Error('Failed to fetch results');
        
        const data = await response.json();
        setCandidates(data.candidates);
        setElectionTitle(data.title);
        setTotalVotes(data.totalVotes);
        setTurnout(data.turnout);
      } catch (err) {
        setError('Failed to load election results');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <div className="loading">Loading election results...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="election-results-page">
      <header className="results-header">
        <div className="container">
          <h1>Submitted Registration</h1>
        </div>
      </header>
      
      <main className="container">
        <div className="election-header">
          <h2>{electionTitle}</h2>
        </div>
        
        <div className="election-stats">
          <div className="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.284-1.255-.758-1.685M12 12a4 4 0 100-8 4 4 0 000 8zM3 20h4v-2a3 3 0 00-5.356-1.857M3 20H7" />
            </svg>
            <span>{candidates.length} candidates</span>
          </div>
          
          <span>{turnout}% Turnout</span>
          
          <div className="stat-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>{totalVotes} votes</span>
          </div>
        </div>

        <div className="candidates-list">
          {candidates.map((candidate) => (
            <div 
              key={candidate.id} 
              className="candidate-card"
              onClick={() => setPage('candidateProfile', candidate.id)}
            >
              <div className="candidate-image">
                {candidate.imageUrl ? (
                  <img src={candidate.imageUrl} alt={candidate.name} />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              
              <div className="candidate-details">
                <h3>{candidate.name}</h3>
                <p>{candidate.role}</p>
                
                <div className="vote-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${candidate.percentage}%` }}
                    ></div>
                  </div>
                  <span className="vote-count">{candidate.percentage}% ({candidate.votes} votes)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ElectionResultsPage;