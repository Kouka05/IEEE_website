import React, { useEffect, useMemo, useState } from 'react';
import './Training.css';
import { getApiBaseUrl } from '../../utils/api';

type TrainingLevel = 'Beginner' | 'Intermediate' | 'Advanced';
type Department = 'Analog' | 'Digital' | 'RF' | 'VLSI' | 'General';

interface TrainingProgram {
  id: string;
  title: string;
  department: Department;
  level: TrainingLevel;
  hours?: number;
  nextStart?: string; 
  summary: string;
  outcomes: string[];
}

const formatDate = (dateText?: string): string => {
  if (!dateText) return '';
  const d = new Date(dateText);
  if (Number.isNaN(d.getTime())) return dateText;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const Training: React.FC = () => {
  const [department, setDepartment] = useState<Department | 'All'>('All');
  const [level, setLevel] = useState<TrainingLevel | 'All'>('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<TrainingProgram | null>(null);
  const [programs, setPrograms] = useState<TrainingProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiBase = getApiBaseUrl();
        const res = await fetch(`${apiBase}/api/trainings?upcoming=true`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error(`API did not return JSON. Received: ${text.slice(0,120)}...`);
        }
        const data = await res.json();
        const list: TrainingProgram[] = (data?.trainings || []).map((t: any) => ({
          id: t._id || t.id,
          title: t.title,
          department: t.department,
          level: t.level,
          hours: t.hours,
          nextStart: t.nextStart,
          summary: t.summary || '',
          outcomes: Array.isArray(t.outcomes) ? t.outcomes : [],
        }));
        setPrograms(list);
      } catch (e: any) {
        setError(e.message || 'Failed to load trainings');
      } finally {
        setLoading(false);
      }
    };
    fetchTrainings();
  }, []);

  const filtered = useMemo(() => {
    return programs.filter(p => (
      (department === 'All' || p.department === department) &&
      (level === 'All' || p.level === level) &&
      (query.trim() === '' || p.title.toLowerCase().includes(query.toLowerCase()))
    ));
  }, [programs, department, level, query]);

  return (
    <div className="training-page">
      <header className="training-header reveal reveal-slow">
        <div className="training-header-content">
          <h1 className="training-title">Training Programs</h1>
          <p className="training-sub">Practical, mentor‑led sessions aligned with IEEE SSCS standards.</p>
        </div>
      </header>

      <section className="training-controls reveal reveal-slow" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
        <div className="controls-row">
          <div className="control">
            <label>Department</label>
            <select value={department} onChange={e => setDepartment(e.target.value as any)} className="control-input">
              <option value="All">All</option>
              <option value="Analog">Analog</option>
              <option value="Digital">Digital</option>
              <option value="RF">RF</option>
              <option value="VLSI">VLSI</option>
              <option value="General">General</option>
            </select>
          </div>
          <div className="control">
            <label>Level</label>
            <select value={level} onChange={e => setLevel(e.target.value as any)} className="control-input">
              <option value="All">All</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="control control-search">
            <label>Search</label>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Find a program"
              className="control-input"
            />
          </div>
        </div>
      </section>

      <main className="training-main">
        {loading && <p className="empty-text reveal reveal-slow">Loading trainings...</p>}
        {error && <p className="empty-text reveal reveal-slow">{error}</p>}
        {filtered.length === 0 && !loading && !error ? (
          <p className="empty-text reveal reveal-slow">No trainings available.</p>
        ) : (
          <div className="program-grid">
            {filtered.map(p => (
              <div
                key={p.id}
                className="program-card reveal reveal-slow"
                style={{ '--reveal-delay': `${80 + ((programs.indexOf(p)) % 6) * 40}ms` } as React.CSSProperties}
              >
                <div className="program-badge-row">
                  <span className="badge badge-dept">{p.department}</span>
                  <span className="badge badge-level">{p.level}</span>
                </div>
                <h3 className="program-title">{p.title}</h3>
                <p className="program-summary">{p.summary}</p>
                <div className="program-meta">
                  {p.hours ? <span>{p.hours} hrs</span> : <span></span>}
                  <span>{p.nextStart ? `Starts ${formatDate(p.nextStart)}` : ''}</span>
                </div>
                <div className="program-actions">
                  <button className="btn-primary" onClick={() => setSelected(p)}>Enroll</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selected && (
        <div className="training-modal" onClick={() => setSelected(null)}>
          <div className="training-modal-content reveal reveal-slow" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>&times;</button>
            <div className="modal-header">
              <h2>{selected.title}</h2>
              <div className="program-badge-row">
                <span className="badge badge-dept">{selected.department}</span>
                <span className="badge badge-level">{selected.level}</span>
                <span className="badge badge-hours">{selected.hours} hrs</span>
              </div>
            </div>
            <p className="modal-sub">Next start: {formatDate(selected.nextStart)}</p>
            <p className="modal-summary">{selected.summary}</p>
            <div className="modal-list">
              <h4>Learning outcomes</h4>
              <ul>
                {selected.outcomes.map(o => (<li key={o}>{o}</li>))}
              </ul>
            </div>
            <div className="modal-actions">
              <a className="btn-primary" href="#" onClick={(e) => e.preventDefault()}>Reserve a seat</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Training;