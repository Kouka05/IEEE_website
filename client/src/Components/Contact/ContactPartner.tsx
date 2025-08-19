import React, { useState } from 'react';
import './ContactPartner.css';
import { Contact } from 'lucide-react';

const ContactPartner: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Partner Form Submitted:', formData);
    alert('Thank you for your partnership inquiry! We will contact you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
      interest: '',
      message: ''
    });
  };

  return (
    <div className="partner-contact-container">
      <div className="partner-hero">
        <div className="hero-content">
          <h1>Become a Partner</h1>
          <p>Join forces with us to create meaningful impact through strategic collaborations</p>
        </div>
      </div>

      <div className="partner-main-content">
        <div className="partner-form-container">
          <div className="form-intro">
            <h2>Partnership Inquiry</h2>
            <p>Let's explore how we can work together. Please provide your details.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="partner-form">
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
              <label htmlFor="company">Company/Organization</label>
              <input 
                type="text" 
                id="company"
                name="company"
                value={formData.company}
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
              <label htmlFor="interest">Partnership Interest</label>
              <select 
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                required
              >
                <option value="">Select an option</option>
                <option value="sponsorship">Sponsorship Opportunities</option>
                <option value="research">Research Collaboration</option>
                <option value="education">Educational Programs</option>
                <option value="technology">Technology Transfer</option>
                <option value="community">Community Initiatives</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            
            <button type="submit" className="submit-btn">
              Submit Partnership Request
            </button>
          </form>
        </div>
        
        <div className="partner-info-container">
          <div className="info-card">
            <h3>Why Partner With Us?</h3>
            <ul className="benefits-list">
              <li>Access to cutting-edge research and innovation</li>
              <li>Collaborative projects with our expert team</li>
              <li>Brand visibility to academic and industry networks</li>
              <li>Talent acquisition from our student community</li>
              <li>Customized partnership solutions</li>
            </ul>
            
            <div className="contact-details">
              <h4>Partnership Contact</h4>
              <p>Email: partnerships@example.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPartner;