import React, { useState } from 'react';
import './ContactSpeaker.css';

const SpeakerContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    phone: '',
    expertise: '',
    experience: '',
    topics: '',
    bio: '',
    availability: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Speaker Form Submitted:', formData);
    alert('Thank you for your speaker application! We will review your submission.');
    setFormData({
      firstName: '',
      lastName: '',
      title: '',
      email: '',
      phone: '',
      expertise: '',
      experience: '',
      topics: '',
      bio: '',
      availability: false
    });
  };

  return (
    <div className="speaker-contact-container">
      <div className="speaker-hero">
        <div className="hero-content">
          <h1>Become a Speaker</h1>
          <p>Share your expertise with our community of learners and professionals</p>
        </div>
      </div>

      <div className="speaker-main-content">
        <div className="speaker-form-container">
          <div className="form-intro">
            <h2>Speaker Application</h2>
            <p>We're looking for inspiring voices to join our speaker series. Tell us about yourself.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="speaker-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="title">Professional Title</label>
              <input 
                type="text" 
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="expertise">Areas of Expertise</label>
              <input 
                type="text" 
                id="expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                placeholder="AI, Machine Learning, Data Science"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="experience">Speaking Experience</label>
              <select 
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
              >
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner (1-5 talks)</option>
                <option value="intermediate">Intermediate (5-15 talks)</option>
                <option value="experienced">Experienced (15-50 talks)</option>
                <option value="expert">Expert (50+ talks)</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="topics">Proposed Topic(s)</label>
              <textarea 
                id="topics"
                name="topics"
                rows={3}
                value={formData.topics}
                onChange={handleChange}
                placeholder="List 1-3 topics you'd like to present..."
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="bio">Speaker Bio (200 words max)</label>
              <textarea 
                id="bio"
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group checkbox-group">
              <input 
                type="checkbox" 
                id="availability"
                name="availability"
                checked={formData.availability}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="availability">
                I'm available to speak at both in-person and virtual events
              </label>
            </div>
            
            <button type="submit" className="submit-btn">
              Submit Speaker Application
            </button>
          </form>
        </div>
        
        <div className="speaker-info-container">
          <div className="info-card">
            <h3>Why Speak With Us?</h3>
            <ul className="benefits-list">
              <li>Reach an engaged audience of students and professionals</li>
              <li>Showcase your expertise and research</li>
              <li>Professional video recording of your presentation</li>
              <li>Networking with academic and industry leaders</li>
              <li>Honorarium for selected speakers</li>
            </ul>
            
            
            <div className="contact-details">
              <h4>Speaker Program Contact</h4>
              <p>Email: speakers@example.com</p>
              <p>Phone: (555) 987-6543</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakerContactPage;