import React, { useEffect, useState } from 'react';

// --- 1. TYPE DEFINITIONS (Updated to match backend model) ---
export interface Event {
  id: string;
  date: Date;
  title: string;
  description: string;
  location: string;
  speakers: { [key: string]: string }; // Maps from backend become objects
  sponsors: string[];
  timeline: { [key: string]: string }; // Maps from backend become objects
  status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED';
  registrationDeadline: Date | null;
  // Other fields like participants, maxParticipants can be added if needed for the UI
}

// --- 2. HELPER FUNCTIONS (Unchanged) ---
const formatEventDate = (date: Date, includeDay: boolean = true): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Invalid Date";
  }
  const day = includeDay ? date.getDate() : '';
  const month = date.toLocaleString('default', { month: 'long' });
  const startTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(' ', '');
  const endTimeDate = new Date(date.getTime() + 2 * 60 * 60 * 1000);
  const endTime = endTimeDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(' ', '');
  return `${includeDay ? `${day} ` : ''}${month} @ ${startTime} - ${endTime}`;
};

const groupEventsByMonth = (events: Event[]): Record<string, Event[]> => {
  return events.reduce((acc, event) => {
    const monthYear = event.date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {} as Record<string, Event[]>);
};

// --- 3. REUSABLE COMPONENTS (Unchanged) ---
const CalendarIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="calendar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const EventItem: React.FC<{ event: Event; onSelect: (event: Event) => void; }> = ({ event, onSelect }) => {
  return (
    <div className="event-item-clickable" onClick={() => onSelect(event)}>
      <div className="event-item">
        <div className="event-item-icon">
          <CalendarIcon />
        </div>
        <div className="event-item-details">
          <p className="event-date-time">{formatEventDate(event.date)}</p>
          <h3 className="event-title">{event.title}</h3>
          <p className="event-description">{event.description}</p>
          <p className="event-location">{event.location}</p>
        </div>
      </div>
    </div>
  );
};

// --- 4. PAGE COMPONENTS (Updated to fetch data) ---

const EventListPage: React.FC<{ onSelectEvent: (event: Event) => void; }> = ({ onSelectEvent }) => {
  const [eventsData, setEventsData] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:8081/api/events/getevents');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const eventsArray = Array.isArray(data) ? data : data.events;

        if (!Array.isArray(eventsArray)) {
          throw new Error("API response did not contain an array of events.");
        }

        const processedEvents = eventsArray.map((event: any) => ({
          ...event,
          id: event._id || event.id,
          date: new Date(event.date),
          registrationDeadline: event.registrationDeadline ? new Date(event.registrationDeadline) : null,
        }));
        setEventsData(processedEvents);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred");
        console.error("Failed to fetch events:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error fetching events: {error}</p>;

  const sortedEvents = [...eventsData].sort((a, b) => a.date.getTime() - b.date.getTime());
  const groupedEvents = groupEventsByMonth(sortedEvents);

  return (
    <div className="events-container">
      <header className="events-header">
        <div className="header-content">
          <h1 className="header-title">Upcoming Events</h1>
          <button className="header-button">Event Archive</button>
        </div>
      </header>
      <main className="events-main">
        <div className="events-list-card">
          {Object.keys(groupedEvents).length === 0 ? (
            <p className="no-events-message">No upcoming events.</p>
          ) : (
            Object.entries(groupedEvents).map(([monthYear, eventsInMonth]) => (
              <div key={monthYear} className={`month-group`}>
                <div className="month-header">
                  <h2 className="month-title">{monthYear}</h2>
                  <div className="month-divider"></div>
                </div>
                <div>
                  {eventsInMonth.map((event) => (
                    <div key={event.id}>
                      <EventItem event={event} onSelect={onSelectEvent} />
                      {eventsInMonth.indexOf(event) < eventsInMonth.length - 1 && <hr className="event-divider" />}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

// NEW: Modal Component
const Modal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <h2>{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

const EventDescriptionPage: React.FC<{ eventId: string; onBack: () => void; }> = ({ eventId, onBack }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', body: '' });

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) return;
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:8081/api/events/${eventId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        const eventData = data.event || data;

        const processedEvent: Event = {
          ...eventData,
          id: eventData._id || eventData.id,
          date: new Date(eventData.date),
          registrationDeadline: eventData.registrationDeadline ? new Date(eventData.registrationDeadline) : null,
        };
        setEvent(processedEvent);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred");
        console.error(`Failed to fetch event ${eventId}:`, e);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [eventId]);
  
  const handleGuestReserve = () => {
    setModalContent({ title: "Reserve as Guest", body: "This is where the guest registration form or confirmation would appear." });
    setModalOpen(true);
  };
  
  const handleSpeakerReserve = () => {
    setModalContent({ title: "Reserve as Speaker", body: "This is where the speaker application form or confirmation would appear." });
    setModalOpen(true);
  };

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error fetching event details: {error}</p>;
  if (!event) return <p>Event not found.</p>;
  
  // This function will now always show the buttons, ignoring the event status and deadline.
  const renderRegistrationStatus = () => {
    return (
      <>
        <button className="guest-button" onClick={handleGuestReserve}>Reserve as guest</button>
        <button className="speaker-button" onClick={handleSpeakerReserve}>Reserve as speaker</button>
      </>
    );
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title={modalContent.title}>
        <p>{modalContent.body}</p>
      </Modal>
      <div className="event-detail-container">
        <button onClick={onBack} className="back-button">← Back to Events</button>
        <header className="event-detail-header">
          <div className="event-detail-header-content">
            <h1 className="event-detail-title">{event.title}</h1>
            <p className="event-detail-time">{formatEventDate(event.date, true)}</p>
          </div>
        </header>
        <main className="event-detail-body">
          <div className="event-detail-body-content event-detail-time">
            <p className="event-detail-description">
              <strong>Description:</strong> {event.description}
            </p>
            <p className="event-detail-location">
              <strong>Location:</strong> {event.location}
            </p>
            {event.sponsors && event.sponsors.length > 0 && (
              <div>
                <strong>Sponsors:</strong>
                <ul>{event.sponsors.map(sponsor => <li key={sponsor}>{sponsor}</li>)}</ul>
              </div>
            )}
            {event.timeline && Object.keys(event.timeline).length > 0 && (
              <div>
                <strong>Timeline:</strong>
                <ul>{Object.entries(event.timeline).map(([time, details]) => <li key={time}><strong>{time}:</strong> {details}</li>)}</ul>
              </div>
            )}
            <div className="button-container">
              {renderRegistrationStatus()}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

// --- 5. MAIN COMPONENT TO EXPORT ---
const Events: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'list' | 'details'>('list');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleSelectEvent = (event: Event) => {
    setSelectedEventId(event.id);
    setCurrentPage('details');
  };

  const handleBackToList = () => {
    setSelectedEventId(null);
    setCurrentPage('list');
  };

  return (
    <div>
      {currentPage === 'list' ? (
        <EventListPage onSelectEvent={handleSelectEvent} />
      ) : selectedEventId ? (
        <EventDescriptionPage eventId={selectedEventId} onBack={handleBackToList} />
      ) : null}
    </div>
  );
};

export default Events;
