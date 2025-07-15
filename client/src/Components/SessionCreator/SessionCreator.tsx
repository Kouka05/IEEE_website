import React, { useState } from 'react';
import './SessionCreator.css';

interface Session {
  id: string;
  title: string;
  link: string;
  description: string;
  date: string;
  headName: string;
  section: string;
}

interface CreateSessionPageProps {
  setPage: (page: string) => void;
  addSession: (session: Session) => void;
}

const CreateSessionPage: React.FC<CreateSessionPageProps> = ({ setPage, addSession }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState({
    day: '01',
    month: '01',
    year: new Date().getFullYear().toString()
  });
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!title || !description) {
      setError('Please fill in all required fields');
      return;
    }

    const newSession = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      link,
      description,
      headName: 'Current User',
      section: 'New Section',
      date: `${date.day}/${date.month}/${date.year}`
    };

    try {
      // Send session to backend
      const response = await fetch('/api/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession)
      });

      if (!response.ok) throw new Error('Failed to create session');
      
      // Add to local state if needed
      addSession(newSession);
      setPage('committee');
    } catch (err) {
      setError('Failed to create session');
      console.error(err);
    }
  };

  return (
    <div className="create-session-page">
      <header className="session-header">
        <div className="container">
          <h1>Create session</h1>
        </div>
      </header>
      
      <main className="container">
        <div className="form-container">
          <div className="form-grid">
            {/* Left Column */}
            <div className="form-column">
              <Input 
                label="Title *" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter session title"
              />
              
              <Input 
                label="Link meeting" 
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://meet.google.com/..."
              />
            </div>
            
            {/* Right Column */}
            <div className="form-column">
              <Textarea 
                label="Description *" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter session description"
              />
              
              <div className="date-selector">
                <label>Date *</label>
                <div className="date-group">
                  <select 
                    value={date.day}
                    onChange={(e) => setDate({...date, day: e.target.value})}
                  >
                    {generateOptions(1, 31)}
                  </select>
                  
                  <select 
                    value={date.month}
                    onChange={(e) => setDate({...date, month: e.target.value})}
                  >
                    <option value="01">Jan</option>
                    <option value="02">Feb</option>
                    <option value="03">Mar</option>
                    <option value="04">Apr</option>
                    <option value="05">May</option>
                    <option value="06">Jun</option>
                    <option value="07">Jul</option>
                    <option value="08">Aug</option>
                    <option value="09">Sep</option>
                    <option value="10">Oct</option>
                    <option value="11">Nov</option>
                    <option value="12">Dec</option>
                  </select>
                  
                  <select 
                    value={date.year}
                    onChange={(e) => setDate({...date, year: e.target.value})}
                  >
                    {generateYearOptions()}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="create-button-container">
            <Button onClick={handleCreate}>Create Session</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper functions
const generateOptions = (start: number, end: number) => {
  const options = [];
  for (let i = start; i <= end; i++) {
    const value = i.toString().padStart(2, '0');
    options.push(<option key={value} value={value}>{value}</option>);
  }
  return options;
};

const generateYearOptions = () => {
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let i = 0; i < 6; i++) {
    const year = currentYear + i;
    years.push(<option key={year} value={year}>{year}</option>);
  }
  return years;
};

// Input Components
interface InputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, value, onChange, placeholder = '' }) => (
  <div className="form-control">
    <label>{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-input"
    />
  </div>
);

interface TextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, value, onChange, placeholder = '' }) => (
  <div className="form-control">
    <label>{label}</label>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="form-textarea"
    />
  </div>
);

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => (
  <button onClick={onClick} className="create-button">
    {children}
  </button>
);

export default CreateSessionPage;