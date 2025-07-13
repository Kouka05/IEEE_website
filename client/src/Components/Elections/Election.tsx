import React, { useState } from 'react';
import './Election.css';

interface ElectionPageProps {
  setPage: (page: string) => void;
}

const ElectionPage: React.FC<ElectionPageProps> = ({ setPage }) => {
  const [electionType, setElectionType] = useState<'board' | 'chairman' | 'custom'>('board');

  return (
    <div className="election-page">
      <header className="election-header">
        <h1>Election</h1>
        <Button variant="secondary" onClick={() => setPage('electionResults')}>See Voting</Button>
      </header>

      <Card>
        <SectionTitle>About Election</SectionTitle>
        <div className="form-grid">
          <Input label="Title" />
          <Textarea label="Description" />
        </div>
        <div className="date-grid">
          <DateSelector label="Start Date" />
          <DateSelector label="Expiration Date" />
        </div>

        <hr className="section-divider" />

        <SectionTitle>Election Type</SectionTitle>
        <div className="radio-group">
          <RadioButton 
            label="Board Member Election (minimum 1 year participation)" 
            name="electionType" 
            value="board" 
            checked={electionType === 'board'} 
            onChange={(e) => setElectionType(e.target.value as 'board' | 'chairman' | 'custom')}
          />
          <RadioButton 
            label="Chairman Election (minimum 2 years participation)" 
            name="electionType" 
            value="chairman" 
            checked={electionType === 'chairman'} 
            onChange={(e) => setElectionType(e.target.value as 'board' | 'chairman' | 'custom')}
          />
          <div className="custom-radio-container">
            <RadioButton 
              label="Custom participation (Years)" 
              name="electionType" 
              value="custom" 
              checked={electionType === 'custom'} 
            onChange={(e) => setElectionType(e.target.value as 'board' | 'chairman' | 'custom')}            />
            <input type="text" className="custom-input" />
          </div>
        </div>

        <hr className="section-divider" />

        <SectionTitle>Candidate info</SectionTitle>
        <div className="checkbox-group">
          <Checkbox label="Include Name Field" checked={true} onChange={() => {}} />
          <Checkbox label="Include Email Field" checked={true} onChange={() => {}} />
          <Checkbox label="Include Committee Field" checked={true} onChange={() => {}} />
        </div>
        <Button variant="secondary">Add New Field</Button>

        <hr className="section-divider" />

        <SectionTitle>Voting info</SectionTitle>
        <div className="checkbox-group">
          <Checkbox label="Allow voters to select multiple candidate" checked={true} onChange={() => {}} />
          <Checkbox label="Enable anonymous voting" checked={true} onChange={() => {}} />
          <Checkbox label="Show live results to voters" checked={true} onChange={() => {}} />
        </div>
      </Card>

      <div className="publish-button-container">
        <Button>Publish Call</Button>
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
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, placeholder = '', type = 'text' }) => (
  <div className="form-control">
    <label>{label}</label>
    <input 
      type={type} 
      placeholder={placeholder} 
      className="form-input" 
    />
  </div>
);

interface TextareaProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({ label, placeholder = '' }) => (
  <div className="form-control">
    <label>{label}</label>
    <textarea 
      placeholder={placeholder} 
      rows={4} 
      className="form-textarea" 
    ></textarea>
  </div>
);

interface DateSelectorProps {
  label: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({ label }) => (
  <div className="date-selector">
    <label>{label}</label>
    <div className="date-selector-group">
      <select className="date-select">
        <option>H</option>
      </select>
      <select className="date-select">
        <option>D</option>
      </select>
      <select className="date-select">
        <option>M</option>
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
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
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