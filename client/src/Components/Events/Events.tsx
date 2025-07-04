import React, { useEffect, useState } from 'react';
import './Events.css'; // Import the separated CSS file

// --- 1. TYPE DEFINITIONS ---
export interface Event {
 id: string;                      // CHANGED: from number to string
  date: Date;                      // The type in our state will be a Date object
  title: string;
  description: string;
  abstract?: string;               // NEW: Optional abstract property
  location: string;                // CHANGED: from 'Online' | 'Offline' to a general string
  sponsors: string[];              // NEW
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'; // NEW: Assuming these possible values
  registrationDeadline: Date | null; // NEW
  // You can add speakers, timeline, etc. here with more specific types if needed
  // For now, they are not used in the UI.
}

// --- 3. HELPER FUNCTIONS ---
const formatEventDate = (date: Date, includeDay: boolean = true): string => {
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


// --- 4. REUSABLE COMPONENTS ---
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

const EventListPage: React.FC<{ onSelectEvent: (event: Event) => void; }> = ({ onSelectEvent }) => {

      // Updated with more details for the description page
  const [eventsData, setEventsData] = useState<Event[]>([
  {
    id: '6866e6d302961ce1799f06d7',
    title: 'Awesome Tech Conference',
    description: 'A deep dive into modern web technologies.',
    date: new Date('2025-07-28T20:00:00.000Z'),
    location: 'Main Auditorium',
    sponsors: ['TechCorp', 'Innovate LLC'],
    status: 'PUBLISHED',
    registrationDeadline: new Date('2025-07-20T23:59:00.000Z'),
  },
  {
    id: '789a0c3b1e8d4f9a2b5c6d7e',
    title: 'Design Systems Meetup',
    description: 'Exploring the future of digital product design.',
    date: new Date('2025-08-15T18:30:00.000Z'),
    location: 'Online',
    sponsors: ['Creative Minds'],
    status: 'PUBLISHED',
    registrationDeadline: null,
  },
]);

    useEffect(() => {
      // Simulate fetching data from an API
      const fetchEvents = async () => {
        const response = await fetch('/api/events'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setEventsData(data);
        }
      };
      fetchEvents();
    }, []);
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
                    Object.entries(groupedEvents).map(([monthYear, eventsInMonth], groupIndex) => (
                    <div key={monthYear} className={`month-group ${groupIndex > 0 ? 'month-group-spaced' : ''}`}>
                        <div className="month-header">
                        <h2 className="month-title">{monthYear}</h2>
                        <div className="month-divider"></div>
                        </div>
                        <div>
                        {eventsInMonth.map((event, eventIndex) => (
                            <div key={event.id}>
                            <EventItem event={event} onSelect={onSelectEvent} />
                            {eventIndex < eventsInMonth.length - 1 && <hr className="event-divider"/>}
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

const EventDescriptionPage: React.FC<{ event: Event; onBack: () => void; }> = ({ event, onBack }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  useEffect(() => { 
    // Simulate fetching data from an API
    const fetchEvents = async () => {
      const response = await fetch(`http://localhost:8081/api/events/6866e6d302961ce1799f06d7`); // Replace with your API endpoint
      if (response.ok) {
        const data = await response.json();
        setSelectedEvent(data);
      }
    };
    fetchEvents();
  }, []);

    return (
        <div className="event-detail-container">
            <button onClick={onBack} className="back-button">← Back to Events</button>
            {selectedEvent!=null ? (<>
            <header className="event-detail-header">
                <div className="event-detail-header-content">
                    <h1 className="event-detail-title">{selectedEvent.title}</h1>
                    <p className="event-detail-time">{formatEventDate(selectedEvent.date, true)}</p>
                </div>
            </header>
            
            <main className="event-detail-body">
                <div className="event-detail-body-content">
                    <p className="event-detail-abstract">
                        <strong>Abstract:</strong> {selectedEvent.abstract}
                    </p>
                    <p className="event-detail-location">
                        <strong>Location:</strong> <a href={selectedEvent.location} target="_blank" rel="noopener noreferrer">{selectedEvent.location}</a>
                    </p>
                </div>
            </main>
            </>):<p style={{color:'black', textAlign:'center'}}>Loading event details...</p>}
        </div>
    );
};

// --- 5. MAIN COMPONENT TO EXPORT ---
const Events: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'list' | 'details'>('list');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setCurrentPage('details');
  };

  const handleBackToList = () => {
    setSelectedEvent(null);
    setCurrentPage('list');
  };

  return (
    <div>
        {currentPage === 'list' ? (
            <EventListPage onSelectEvent={handleSelectEvent} />
        ) : selectedEvent ? (
            <EventDescriptionPage event={selectedEvent} onBack={handleBackToList} />
        ) : null}
    </div>
  );
};

export default Events;