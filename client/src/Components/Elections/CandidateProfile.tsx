import React, { useState, useEffect } from 'react';
import './CandidateProfile.css';

interface Candidate {
  id: string;
  name: string;
  role: string;
  region: string;
  participation: string;
  previousRole: string;
  statement: string;
  imageUrl?: string;
  votes: number;
  percentage: number;
}

interface CandidateProfilePageProps {
  setPage: (page: string, candidateId?: string) => void;
  candidateId?: string;
}

const CandidateProfilePage: React.FC<CandidateProfilePageProps> = ({ setPage, candidateId }) => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    const fetchCandidate = async () => {
      if (!candidateId) return;
      
      try {
        const response = await fetch(`/api/candidates/${candidateId}`);
        if (!response.ok) throw new Error('Candidate not found');
        
        const data = await response.json();
        setCandidate(data);
      } catch (err) {
        setError('Failed to load candidate profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [candidateId]);

  const handleVote = async () => {
    if (!candidateId || isVoting) return;
    
    try {
      setIsVoting(true);
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateId })
      });
      
      if (!response.ok) throw new Error('Vote failed');
      
      // Redirect to results page after successful vote
      setPage('electionResults');
    } catch (err) {
      setError('Failed to submit vote');
      console.error(err);
    } finally {
      setIsVoting(false);
    }
  };

  if (loading) return <div className="loading">Loading candidate profile...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!candidate) return <div className="error">Candidate not found</div>;

  return (
    <div className="candidate-profile-page">
      <header className="profile-header">
        <div className="container">
          <h1>Submitted Registration</h1>
        </div>
      </header>
      
      <main className="container">
        <div className="profile-grid">
          <div className="profile-image">
            {candidate.imageUrl ? (
              <img src={candidate.imageUrl} alt={candidate.name} />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          
          <div className="profile-details">
            <h2>{candidate.name}</h2>
            
            <div className="candidate-info">
              <p><strong>Region:</strong> <span className="highlight">{candidate.region}</span></p>
              <p><strong>Participation:</strong> {candidate.participation}</p>
              <p><strong>Previous Role:</strong> {candidate.previousRole}</p>
            </div>
            
            <div className="vote-stats">
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
        
        <div className="candidate-statement">
          <h3>Why I'm Running</h3>
          <p>{candidate.statement}</p>
        </div>
        
        <div className="action-buttons">
          <button 
            className={`vote-button ${isVoting ? 'disabled' : ''}`} 
            onClick={handleVote}
            disabled={isVoting}
          >
            {isVoting ? 'Voting...' : 'Choose this Candidate'}
          </button>
          <button className="cancel-button" onClick={() => setPage('electionResults')}>
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
};

export default CandidateProfilePage;