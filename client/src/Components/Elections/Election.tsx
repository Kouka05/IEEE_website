import React, { useState } from 'react';
import './Election.css';
import { Link } from 'react-router-dom';

interface ElectionPageProps {
  setPage: (page: string) => void;
}

interface DateState {
  hour: string;
  day: string;
  month: string;
  year: string;
}

// Generate options for date selects
const generateOptions = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => {
    const value = (start + i).toString().padStart(2, '0');
    return <option key={value} value={value}>{value}</option>;
  });
};

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 6 }, (_, i) => {
    const year = currentYear + i;
    return <option key={year} value={year}>{year}</option>;
  });
};

const ElectionPage: React.FC<ElectionPageProps> = ({ setPage }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<DateState>({
    hour: '00',
    day: '01',
    month: '01',
    year: new Date().getFullYear().toString()
  });
  const [expirationDate, setExpirationDate] = useState<DateState>({
    hour: '00',
    day: '01',
    month: '01',
    year: (new Date().getFullYear() + 1).toString()
  });
  const [electionType, setElectionType] = useState<'board' | 'chairman' | 'custom'>('board');
  const [customYears, setCustomYears] = useState('');
  const [includeName, setIncludeName] = useState(true);
  const [includeEmail, setIncludeEmail] = useState(true);
  const [includeCommittee, setIncludeCommittee] = useState(true);
  const [allowMultiple, setAllowMultiple] = useState(true);
  const [anonymous, setAnonymous] = useState(true);
  const [showResults, setShowResults] = useState(true);
  const [candidateCustomFields, setCandidateCustomFields] = useState<string[]>([]);
  const [newFieldName, setNewFieldName] = useState('');

  const handleDateChange = (
    dateType: 'start' | 'expiration',
    field: keyof DateState,
    value: string
  ) => {
    if (dateType === 'start') {
      setStartDate(prev => ({ ...prev, [field]: value }));
    } else {
      setExpirationDate(prev => ({ ...prev, [field]: value }));
    }
  };

  // Add new candidate field
  const addNewField = () => {
    if (newFieldName.trim()) {
      setCandidateCustomFields([...candidateCustomFields, newFieldName]);
      setNewFieldName('');
    }
  };

  const removeCustomField = (index: number) => {
    setCandidateCustomFields(candidateCustomFields.filter((_, i) => i !== index));
  };

  // Publish election to backend
  const handlePublish = async () => {
    const formatDate = (date: DateState) => {
      return new Date(
        Date.UTC(
          parseInt(date.year),
          parseInt(date.month) - 1,
          parseInt(date.day),
          parseInt(date.hour)
        )
      ).toISOString();
    };

    const electionData = {
      title,
      description,
      startDate: formatDate(startDate),
      expirationDate: formatDate(expirationDate),
      electionType,
      customYears: electionType === 'custom' ? parseInt(customYears) : undefined,
      candidateFields: {
        name: includeName,
        email: includeEmail,
        committee: includeCommittee,
        custom: candidateCustomFields
      },
      votingOptions: {
        allowMultiple,
        anonymous,
        showResults
      }
    };

    try {
      const response = await fetch('/api/elections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(electionData)
      });

      if (!response.ok) throw new Error('Failed to publish election');

      const data = await response.json();
      console.log('Election published:', data);
      setPage('electionResults');
    } catch (error) {
      console.error('Publish error:', error);
      alert('Failed to publish election');
    }
  };

  return (
    <div className="election-page">
      <header className="election-header">
        <h1>Election</h1>
        <Link to="/election">
          <Button variant="secondary">
            See Voting
          </Button>
        </Link>
      </header>

      <Card>
        <SectionTitle>About Election</SectionTitle>
        <div className="form-grid">
          <Input 
            label="Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea 
            label="Description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="date-grid">
          <DateSelector 
            label="Start Date"
            date={startDate}
            onChange={(field, value) => handleDateChange('start', field, value)}
          />
          <DateSelector 
            label="Expiration Date"
            date={expirationDate}
            onChange={(field, value) => handleDateChange('expiration', field, value)}
          />
        </div>

        <hr className="section-divider" />

        <SectionTitle>Election Type</SectionTitle>
        <div className="radio-group">
          <RadioButton 
            label="Board Member Election (minimum 1 year participation)" 
            name="electionType" 
            value="board" 
            checked={electionType === 'board'} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setElectionType(e.target.value as 'board' | 'chairman' | 'custom')}
          />
          <RadioButton 
            label="Chairman Election (minimum 2 years participation)" 
            name="electionType" 
            value="chairman" 
            checked={electionType === 'chairman'} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setElectionType(e.target.value as 'board' | 'chairman' | 'custom')}
          />
          <div className="custom-radio-container">
            <RadioButton 
              label="Custom participation (Years)" 
              name="electionType" 
              value="custom" 
              checked={electionType === 'custom'} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setElectionType(e.target.value as 'board' | 'chairman' | 'custom')}
            />
            <input 
              type="number"
              min="1"
              value={customYears}
              onChange={(e) => setCustomYears(e.target.value)}
              className="custom-input"
              disabled={electionType !== 'custom'}
            />
          </div>
        </div>

        <hr className="section-divider" />

        <SectionTitle>Candidate info</SectionTitle>
        <div className="checkbox-group">
          <Checkbox 
            label="Include Name Field" 
            checked={includeName} 
            onChange={setIncludeName} 
          />
          <Checkbox 
            label="Include Email Field" 
            checked={includeEmail} 
            onChange={setIncludeEmail} 
          />
          <Checkbox 
            label="Include Committee Field" 
            checked={includeCommittee} 
            onChange={setIncludeCommittee} 
          />
          
          {candidateCustomFields.map((field, index) => (
            <div key={index} className="custom-field">
              <Checkbox 
                label={field} 
                checked={true} 
                onChange={() => removeCustomField(index)} 
              />
            </div>
          ))}
        </div>
        
        <div className="add-field-container">
          <input
            type="text"
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            placeholder="New field name"
            className="field-input"
          />
          <Button variant="secondary" onClick={addNewField}>
            Add New Field
          </Button>
        </div>

        <hr className="section-divider" />

        <SectionTitle>Voting info</SectionTitle>
        <div className="checkbox-group">
          <Checkbox 
            label="Allow voters to select multiple candidates" 
            checked={allowMultiple} 
            onChange={setAllowMultiple} 
          />
          <Checkbox 
            label="Enable anonymous voting" 
            checked={anonymous} 
            onChange={setAnonymous} 
          />
          <Checkbox 
            label="Show live results to voters" 
            checked={showResults} 
            onChange={setShowResults} 
          />
        </div>
      </Card>

      <div className="publish-button-container">
        <Button onClick={handlePublish}>Publish Election</Button>
      </div>
    </div>
  );
};

// Component Definitions
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`card ${className}`}>{children}</div>
);

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h2 className="section-title">{children}</h2>
);

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

interface DateSelectorProps {
  label: string;
  date: DateState;
  onChange: (field: keyof DateState, value: string) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ label, date, onChange }) => (
  <div className="date-selector">
    <label>{label}</label>
    <div className="date-selector-group">
      <select 
        value={date.year}
        onChange={(e) => onChange('year', e.target.value)}
        className="date-select"
      >
        {generateYearOptions()}
      </select>
      <select 
        value={date.month}
        onChange={(e) => onChange('month', e.target.value)}
        className="date-select"
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
        value={date.day}
        onChange={(e) => onChange('day', e.target.value)}
        className="date-select"
      >
        {generateOptions(1, 31)}
      </select>
      <select 
        value={date.hour}
        onChange={(e) => onChange('hour', e.target.value)}
        className="date-select"
      >
        {generateOptions(0, 23)}
      </select>
    </div>
  </div>
);

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => (
  <div className="checkbox">
    <div 
      className={`checkbox-box ${checked ? 'checked' : ''}`}
      onClick={() => onChange(!checked)}
    >
      {checked && <CheckIcon />}
    </div>
    <span>{label}</span>
  </div>
);

const CheckIcon = () => (
  <svg className="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
);

interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, name, value, checked, onChange }) => (
  <label className="radio">
    <input 
      type="radio" 
      name={name} 
      value={value} 
      checked={checked} 
      onChange={onChange} 
      className="radio-input" 
    />
    <div className={`radio-button ${checked ? 'checked' : ''}`}></div>
    <span>{label}</span>
  </label>
);

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '' 
}) => {
  return (
    <button 
      onClick={onClick} 
      className={`button button-${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default ElectionPage;