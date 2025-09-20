import React from 'react';
import './Call.css';

const CallPage = ({ setPage }: { setPage: (page: string) => void }) => {
  const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`card ${className}`}>
      {children}
    </div>
  );

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="section-title">{children}</h2>
  );

  const Input = ({ label, placeholder = '', type = 'text', value, onChange }: 
    { label: string; placeholder?: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="input-container">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );

  const Textarea = ({ label, placeholder = '', value, onChange }: 
    { label: string; placeholder?: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) => (
    <div className="input-container">
      <label>{label}</label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={4}
      />
    </div>
  );

  const Checkbox = ({ label, checked, onChange }: 
    { label: string; checked: boolean; onChange: (checked: boolean) => void }) => (
    <div className="checkbox-container">
      <div 
        className={`checkbox-box ${checked ? 'checked' : ''}`}
        onClick={() => onChange(!checked)}
      >
        {checked && (
          <svg className="checkbox-icon" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span>{label}</span>
    </div>
  );

  type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

  const Button = ({ children, onClick, variant = 'primary', className = '' }: 
    { children: React.ReactNode; onClick: () => void; variant?: ButtonVariant; className?: string }) => {
    const variantClasses: Record<ButtonVariant, string> = {
      primary: 'button-primary',
      secondary: 'button-secondary',
      danger: 'button-danger',
      success: 'button-success'
    };
    
    return (
      <button 
        onClick={onClick} 
        className={`button ${variantClasses[variant]} ${className}`}
      >
        {children}
      </button>
    );
  };

  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [startDate, setStartDate] = React.useState({
    hour: '00',
    day: '01',
    month: '01',
    year: new Date().getFullYear().toString()
  });
  const [expirationDate, setExpirationDate] = React.useState({
    hour: '00',
    day: '01',
    month: '01',
    year: (new Date().getFullYear() + 1).toString()
  });
  const [includeName, setIncludeName] = React.useState(true);
  const [includeEmail, setIncludeEmail] = React.useState(true);
  const [includeCommittee, setIncludeCommittee] = React.useState(true);

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

  const handleDateChange = (
    dateType: 'start' | 'expiration',
    field: 'hour' | 'day' | 'month' | 'year',
    value: string
  ) => {
    if (dateType === 'start') {
      setStartDate(prev => ({ ...prev, [field]: value }));
    } else {
      setExpirationDate(prev => ({ ...prev, [field]: value }));
    }
  };

  const handlePublish = () => {
    const formatDate = (date: typeof startDate) => {
      return new Date(
        Date.UTC(
          parseInt(date.year),
          parseInt(date.month) - 1,
          parseInt(date.day),
          parseInt(date.hour)
        )
      ).toISOString();
    };

    const callData = {
      title,
      description,
      startDate: formatDate(startDate),
      expirationDate: formatDate(expirationDate),
      includeName,
      includeEmail,
      includeCommittee,
    };

    console.log('Call data:', callData);
    // Backend check this and test to see if it works
    // fetch('/api/calls', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'application/json'},
    //   body: JSON.stringify(callData)
    // })
  };

  return (
    <div className="call-page">
      <header className="call-header">
        <h1>Call</h1>
        <Button variant="secondary" onClick={() => setPage('submittedRegistration')}>
          See registrations
        </Button>
      </header>

      <Card>
        <SectionTitle>About call</SectionTitle>
        <div className="form-grid">
          <Input 
            label="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter call title"
          />
          <Textarea 
            label="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter call description"
          />
        </div>
        
        <div className="date-grid">
          <div className="date-section">
            <label className="date-label">Start Date</label>
            <div className="date-select">
              <select 
                value={startDate.year} 
                onChange={(e) => handleDateChange('start', 'year', e.target.value)}
              >
                {generateYearOptions()}
              </select>
              <select 
                value={startDate.month} 
                onChange={(e) => handleDateChange('start', 'month', e.target.value)}
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
                value={startDate.day} 
                onChange={(e) => handleDateChange('start', 'day', e.target.value)}
              >
                {generateOptions(1, 31)}
              </select>
              <select 
                value={startDate.hour} 
                onChange={(e) => handleDateChange('start', 'hour', e.target.value)}
              >
                {generateOptions(0, 23)}
              </select>
            </div>
          </div>
          
          <div className="date-section">
            <label className="date-label">Expiration Date</label>
            <div className="date-select">
              <select 
                value={expirationDate.year} 
                onChange={(e) => handleDateChange('expiration', 'year', e.target.value)}
              >
                {generateYearOptions()}
              </select>
              <select 
                value={expirationDate.month} 
                onChange={(e) => handleDateChange('expiration', 'month', e.target.value)}
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
                value={expirationDate.day} 
                onChange={(e) => handleDateChange('expiration', 'day', e.target.value)}
              >
                {generateOptions(1, 31)}
              </select>
              <select 
                value={expirationDate.hour} 
                onChange={(e) => handleDateChange('expiration', 'hour', e.target.value)}
              >
                {generateOptions(0, 23)}
              </select>
            </div>
          </div>
        </div>

        <hr className="divider" />

        <SectionTitle>Registration Fields</SectionTitle>
        <div className="checkbox-group">
          <Checkbox label="Include Name Field" checked={includeName} onChange={setIncludeName} />
          <Checkbox label="Include Email Field" checked={includeEmail} onChange={setIncludeEmail} />
          <Checkbox label="Include Committee Field" checked={includeCommittee} onChange={setIncludeCommittee} />
        </div>
        <Button variant="secondary" onClick={() => {}}>Add New Field</Button>
      </Card>

      <div className="publish-container">
        <Button onClick={handlePublish}>Publish Call</Button>
      </div>
    </div>
  );
};

export default CallPage;