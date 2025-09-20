import React, { useEffect, useState } from 'react';
import './CreateTraining.css';
import { useAuth } from '../../AuthContext';
import { getApiBaseUrl } from '../../utils/api';

type TrainingLevel = 'Beginner' | 'Intermediate' | 'Advanced';
type Department = 'Analog' | 'Digital' | 'RF' | 'VLSI' | 'General';

interface TrainingFormData {
  title: string;
  department: Department;
  level: TrainingLevel;
  hours: number;
  nextStart: string;
  summary: string;
  outcomes: string[];
  maxParticipants: number;
  prerequisites: string;
  instructor: string;
  location: string;
  materials: string;
}

const CreateTraining: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="create-training-page">
        <div className="error-text">You must be signed in to create a training program.</div>
      </div>
    );
  }

  const [formData, setFormData] = useState<TrainingFormData>({
    title: '',
    department: 'General',
    level: 'Beginner',
    hours: 12,
    nextStart: '',
    summary: '',
    outcomes: [''],
    maxParticipants: 20,
    prerequisites: '',
    instructor: '',
    location: '',
    materials: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [editingTrainingId, setEditingTrainingId] = useState<string | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);


  const handleInputChange = (field: keyof TrainingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOutcomeChange = (index: number, value: string) => {
    const newOutcomes = [...formData.outcomes];
    newOutcomes[index] = value;
    setFormData(prev => ({ ...prev, outcomes: newOutcomes }));
  };

  const addOutcome = () => {
    setFormData(prev => ({ ...prev, outcomes: [...prev.outcomes, ''] }));
  };

  const removeOutcome = (index: number) => {
    if (formData.outcomes.length > 1) {
      const newOutcomes = formData.outcomes.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, outcomes: newOutcomes }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Filter out empty outcomes
      const filteredOutcomes = formData.outcomes.filter(outcome => outcome.trim() !== '');
      
      const trainingData = {
        ...formData,
        outcomes: filteredOutcomes,
        createdBy: user._id,
      };

      const apiBase = getApiBaseUrl();
      const res = await fetch(`${apiBase}/api/trainings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trainingData)
      });
      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await res.json() : { success: false, error: 'Non-JSON response from API' };
      if (!res.ok || !data.success) {
        throw new Error(data?.error || 'Failed to create training');
      }
      setSubmitMessage('Training program created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        department: 'General',
        level: 'Beginner',
        hours: 12,
        nextStart: '',
        summary: '',
        outcomes: [''],
        maxParticipants: 20,
        prerequisites: '',
        instructor: '',
        location: '',
        materials: ''
      });
    } catch (error) {
      setSubmitMessage('Error creating training program. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setEditingTrainingId(null);
    setFormData({
      title: '',
      department: 'General',
      level: 'Beginner',
      hours: 12,
      nextStart: '',
      summary: '',
      outcomes: [''],
      maxParticipants: 20,
      prerequisites: '',
      instructor: '',
      location: '',
      materials: ''
    });
    setSubmitMessage('');
  };

  return (
    <div className="create-training-page">
      <div className="create-training-container reveal">
        <h1 className="create-training-title reveal" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
          Create Training Program
        </h1>
        
        <form className="create-training-form reveal" style={{ '--reveal-delay': '200ms' } as React.CSSProperties} onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div className="form-section reveal" style={{ '--reveal-delay': '300ms' } as React.CSSProperties}>
            <h3 className="form-section-title">Basic Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Training Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Analog IC Design Fundamentals"
                  required
                />
              </div>
              <div className="form-group">
                <label>Department *</label>
                <select
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value as Department)}
                  required
                >
                  <option value="General">General</option>
                  <option value="Analog">Analog</option>
                  <option value="Digital">Digital</option>
                  <option value="RF">RF</option>
                  <option value="VLSI">VLSI</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Level *</label>
                <select
                  value={formData.level}
                  onChange={(e) => handleInputChange('level', e.target.value as TrainingLevel)}
                  required
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="form-group">
                <label>Duration (Hours) *</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.hours}
                  onChange={(e) => handleInputChange('hours', parseInt(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Summary *</label>
              <textarea
                value={formData.summary}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                placeholder="Brief description of what participants will learn"
                rows={3}
                required
              />
            </div>
          </div>

          {/* Schedule & Logistics */}
          <div className="form-section reveal" style={{ '--reveal-delay': '400ms' } as React.CSSProperties}>
            <h3 className="form-section-title">Schedule & Logistics</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Next Start Date *</label>
                <input
                  type="date"
                  value={formData.nextStart}
                  onChange={(e) => handleInputChange('nextStart', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Max Participants</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formData.maxParticipants}
                  onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Instructor *</label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => handleInputChange('instructor', e.target.value)}
                  placeholder="Instructor name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Training location"
                />
              </div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="form-section reveal" style={{ '--reveal-delay': '500ms' } as React.CSSProperties}>
            <h3 className="form-section-title">Learning Outcomes</h3>
            <p className="form-help-text">List what participants will be able to do after completing this training</p>
            
            {formData.outcomes.map((outcome, index) => (
              <div key={index} className="outcome-row">
                <input
                  type="text"
                  value={outcome}
                  onChange={(e) => handleOutcomeChange(index, e.target.value)}
                  placeholder={`Learning outcome ${index + 1}`}
                />
                {formData.outcomes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOutcome(index)}
                    className="remove-outcome-btn"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addOutcome}
              className="add-outcome-btn"
            >
              + Add Learning Outcome
            </button>
          </div>

          {/* Additional Information */}
          <div className="form-section reveal" style={{ '--reveal-delay': '600ms' } as React.CSSProperties}>
            <h3 className="form-section-title">Additional Information</h3>
            
            <div className="form-group">
              <label>Prerequisites</label>
              <textarea
                value={formData.prerequisites}
                onChange={(e) => handleInputChange('prerequisites', e.target.value)}
                placeholder="Any prerequisites or recommended background knowledge"
                rows={2}
              />
            </div>

            <div className="form-group">
              <label>Materials & Resources</label>
              <textarea
                value={formData.materials}
                onChange={(e) => handleInputChange('materials', e.target.value)}
                placeholder="Required materials, software, or resources"
                rows={2}
              />
            </div>
          </div>

          {/* Submit Section */}
          <div className="form-actions reveal" style={{ '--reveal-delay': '700ms' } as React.CSSProperties}>
            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
                {submitMessage}
              </div>
            )}
            
            <div className="form-actions-row">
              {editingTrainingId ? (
                <>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={async () => {
                      if (!confirm('Are you sure you want to delete this training? This action cannot be undone.')) return;
                      try {
                        const apiBase = getApiBaseUrl();
                        const res = await fetch(`${apiBase}/api/trainings/${editingTrainingId}`, { method: 'DELETE' });
                        const contentType = res.headers.get('content-type') || '';
                        const data = contentType.includes('application/json') ? await res.json() : { success: false, error: 'Non-JSON response from API' };
                        if (!res.ok || !data.success) throw new Error(data?.error || 'Delete failed');
                        setSubmitMessage('Training deleted successfully');
                        resetForm();
                      } catch (e) {
                        setSubmitMessage('Failed to delete training');
                      }
                    }}
                  >
                    Delete Training
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    disabled={isSubmitting}
                    onClick={async () => {
                      try {
                        setIsSubmitting(true);
                        const apiBase = getApiBaseUrl();
                        const res = await fetch(`${apiBase}/api/trainings/${editingTrainingId}`, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(formData)
                        });
                        const contentType = res.headers.get('content-type') || '';
                        const data = contentType.includes('application/json') ? await res.json() : { success: false, error: 'Non-JSON response from API' };
                        if (!res.ok || !data.success) throw new Error(data?.error || 'Update failed');
                        setSubmitMessage('Training updated successfully!');
                        resetForm();
                      } catch (e) {
                        setSubmitMessage('Error updating training. Please try again.');
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setUpdateModalOpen(true)}
                  >
                    Edit Training
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner"></div>
                        Creating...
                      </>
                    ) : (
                      'Create Training Program'
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>

      {updateModalOpen && (
        <SelectTrainingModal
          onClose={() => setUpdateModalOpen(false)}
          onSelect={(t) => {
            setEditingTrainingId(t._id || t.id);
            setFormData({
              title: t.title || '',
              department: t.department || 'General',
              level: t.level || 'Beginner',
              hours: t.hours || 12,
              nextStart: t.nextStart ? String(t.nextStart).slice(0,10) : '',
              summary: t.summary || '',
              outcomes: Array.isArray(t.outcomes) && t.outcomes.length ? t.outcomes : [''],
              maxParticipants: t.maxParticipants || 20,
              prerequisites: t.prerequisites || '',
              instructor: t.instructor || '',
              location: t.location || '',
              materials: t.materials || ''
            });
            setUpdateModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default CreateTraining

const SelectTrainingModal: React.FC<{
  onClose: () => void;
  onSelect: (t: any) => void;
}> = ({ onClose, onSelect }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const apiBase = getApiBaseUrl();
        const res = await fetch(`${apiBase}/api/trainings`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          const text = await res.text();
          throw new Error(`API did not return JSON. Received: ${text.slice(0,120)}...`);
        }
        const data = await res.json();
        setItems(data?.trainings || []);
      } catch (e: any) {
        setError(e.message || 'Failed to load trainings');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Select Training to Edit</h3>
        {loading && <div className="loading-text">Loading...</div>}
        {error && <div className="error-text">{error}</div>}
        {!loading && !error && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 400, overflowY: 'auto' }}>
            {items.length === 0 ? (
              <div className="no-events-message">No trainings found.</div>
            ) : (
              items.map(t => (
                <button key={t._id || t.id} className="update-btn" type="button" onClick={() => onSelect(t)}>
                  {t.title}
                </button>
              ))
            )}
          </div>
        )}
        <div className="modal-actions">
          <button type="button" onClick={onClose} className="update-btn">Close</button>
        </div>
      </div>
    </div>
  );
};