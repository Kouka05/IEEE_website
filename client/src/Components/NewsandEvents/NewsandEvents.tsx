import React, { useState } from 'react';
import './NewsAndEvents.css'; // Import the separated CSS file

// --- 1. TYPE DEFINITIONS ---
export interface Event {
  id: number;
  date: Date;
  title: string;
  description: string;
  location: 'Online' | 'Offline';
  abstract: string;
  locationUrl: string;
}

export interface NewsArticle {
  id: number;
  imageUrl: string;
  title: string;
  content: string;
}


// --- 2. MOCK DATA ---
const eventsData: Event[] = [
    { id: 1, date: new Date('2025-06-14T22:00:00'), title: 'SSCS Lorum Ipsum Event Place Holder', description: 'At vero eos et accusamus et iusto', location: 'Online', abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse venenatis ipsum commodo enim vehicula, sit amet porttitor magna vehicula. In eget nulla quis enim pharetra venenatis fringilla eget ante. Mauris euismod odio dolor, in auctor nulla iaculis et. Duis convallis augue eget libero porttitor sollicitudin sit amet id justo.', locationUrl: 'https://maps.app.goo.gl/Bqk4o1A489oFczgf9' },
    { id: 2, date: new Date('2025-06-23T23:00:00'), title: 'SSCS Lorum Ipsum Event Place Holder', description: 'At vero eos et accusamus et iusto', location: 'Offline', abstract: 'This is the abstract for the second event. It provides a more detailed summary of what will be covered, who the speakers are, and what attendees can expect to learn. We look forward to seeing you there for this insightful session.', locationUrl: 'https://maps.app.goo.gl/Bqk4o1A489oFczgf9' },
    { id: 3, date: new Date('2025-07-14T22:00:00'), title: 'SSCS Lorum Ipsum Event Place Holder', description: 'At vero eos et accusamus et iusto', location: 'Online', abstract: 'Join us for the third event in our series. This abstract covers the key topics of discussion, including emerging trends and future outlooks. A perfect opportunity for networking and professional development.', locationUrl: 'https://maps.app.goo.gl/Bqk4o1A489oFczgf9' },
    { id: 4, date: new Date('2025-07-28T20:00:00'), title: 'Another Awesome Tech Conference', description: 'Join us for a deep dive into modern web technologies.', location: 'Online', abstract: 'A deep dive into the latest advancements in web development. This conference will feature talks from industry leaders on topics like React, Vue, Svelte, and the future of the web. Bring your questions for the Q&A session.', locationUrl: 'https://maps.app.goo.gl/Bqk4o1A489oFczgf9' },
];

const newsData: NewsArticle[] = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    imageUrl: '', // Placeholder
    title: 'Local Chapter. Global Impact.',
    content: `This is the full content for the news article titled "Local Chapter. Global Impact." Article number ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
}));


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
    if (!acc[monthYear]) { acc[monthYear] = []; }
    acc[monthYear].push(event);
    return acc;
  }, {} as Record<string, Event[]>);
};

// --- 4. REUSABLE COMPONENTS ---
const CalendarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="calendar-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>);
const PlaceholderIcon = () => (<svg className="placeholder-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L6 18M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);

const EventItem: React.FC<{ event: Event; onSelect: (event: Event) => void; }> = ({ event, onSelect }) => (
    <div className="event-item-clickable" onClick={() => onSelect(event)}>
      <div className="event-item">
        <div className="event-item-icon"><CalendarIcon /></div>
        <div className="event-item-details">
          <p className="event-date-time">{formatEventDate(event.date)}</p>
          <h3 className="event-title">{event.title}</h3>
          <p className="event-description">{event.description}</p>
          <p className="event-location">{event.location}</p>
        </div>
      </div>
    </div>
);

const EventListPage: React.FC<{ onSelectEvent: (event: Event) => void; }> = ({ onSelectEvent }) => {
    const sortedEvents = [...eventsData].sort((a, b) => a.date.getTime() - b.date.getTime());
    const groupedEvents = groupEventsByMonth(sortedEvents);
    return (
        <div className="events-container">
            <header className="events-header"><div className="header-content"><h1 className="header-title">Upcoming Events</h1><button className="header-button">Event Archive</button></div></header>
            <main className="events-main"><div className="events-list-card">
                {Object.keys(groupedEvents).length === 0 ? <p className="no-events-message">No upcoming events.</p> : Object.entries(groupedEvents).map(([monthYear, eventsInMonth], groupIndex) => (
                    <div key={monthYear} className={`month-group ${groupIndex > 0 ? 'month-group-spaced' : ''}`}>
                        <div className="month-header"><h2 className="month-title">{monthYear}</h2><div className="month-divider"></div></div>
                        <div>{eventsInMonth.map((event, eventIndex) => (<div key={event.id}><EventItem event={event} onSelect={onSelectEvent} />{eventIndex < eventsInMonth.length - 1 && <hr className="event-divider"/>}</div>))}</div>
                    </div>
                ))}
            </div></main>
        </div>
    );
};

const EventDescriptionPage: React.FC<{ event: Event; onBack: () => void; }> = ({ event, onBack }) => (
    <div className="event-detail-container">
        <button onClick={onBack} className="back-button">← Back to Events</button>
        <header className="event-detail-header"><div className="event-detail-header-content"><h1 className="event-detail-title">{event.title}</h1><p className="event-detail-time">{formatEventDate(event.date, true)}</p></div></header>
        <main className="event-detail-body"><div className="event-detail-body-content"><p className="event-detail-abstract"><strong>Abstract:</strong> {event.abstract}</p><p className="event-detail-location"><strong>Location:</strong> <a href={event.locationUrl} target="_blank" rel="noopener noreferrer">{event.locationUrl}</a></p></div></main>
    </div>
);

const NewsCard: React.FC<{ article: NewsArticle; onSelect: (article: NewsArticle) => void; }> = ({ article, onSelect }) => (
    <div className="news-card" onClick={() => onSelect(article)}>
        <div className="news-card-image-placeholder"><PlaceholderIcon /></div>
        <div className="news-card-title">{article.title}</div>
    </div>
);

const NewsPage: React.FC<{ onSelectArticle: (article: NewsArticle) => void; }> = ({ onSelectArticle }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;
    const totalPages = Math.ceil(newsData.length / articlesPerPage);
    const paginatedArticles = newsData.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="news-page-container">
            <header className="news-header"><div className="news-header-content"><h1 className="news-header-title">Latest News</h1></div></header>
            <div className="news-grid">{paginatedArticles.map(article => <NewsCard key={article.id} article={article} onSelect={onSelectArticle} />)}</div>
            <div className="pagination">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
                {[...Array(totalPages).keys()].map(num => (
                    <button key={num + 1} onClick={() => goToPage(num + 1)} className={currentPage === num + 1 ? 'active' : ''}>{num + 1}</button>
                ))}
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
            </div>
        </div>
    );
};

const NewsDescriptionPage: React.FC<{ article: NewsArticle; onBack: () => void; }> = ({ article, onBack }) => (
    <div className="news-detail-container">
        <button onClick={onBack} className="back-button">← Back to News</button>
        <div className="news-detail-body">
            <h1 className="news-detail-title">{article.title}</h1>
            <div className="news-detail-image-placeholder"><PlaceholderIcon /></div>
            <p className="news-detail-content">{article.content}</p>
        </div>
    </div>
);


// --- 5. MAIN COMPONENT TO EXPORT ---
const NewsandEvents: React.FC = () => {
  const [activeView, setActiveView] = useState<'events' | 'news'>('events');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const handleSelectEvent = (event: Event) => setSelectedEvent(event);
  const handleBackToEventList = () => setSelectedEvent(null);

  const handleSelectArticle = (article: NewsArticle) => setSelectedArticle(article);
  const handleBackToNewsList = () => setSelectedArticle(null);

  const renderContent = () => {
      if (activeView === 'news') {
          if (selectedArticle) {
              return <NewsDescriptionPage article={selectedArticle} onBack={handleBackToNewsList} />;
          }
          return <NewsPage onSelectArticle={handleSelectArticle} />;
      }
      
      // Events View
      if (selectedEvent) {
          return <EventDescriptionPage event={selectedEvent} onBack={handleBackToEventList} />;
      }
      return <EventListPage onSelectEvent={handleSelectEvent} />;
  };

  return (
    <div>
        <nav className="app-nav">
            <button onClick={() => { setActiveView('events'); setSelectedEvent(null); setSelectedArticle(null); }} className={activeView === 'events' ? 'active' : ''}>Events</button>
            <button onClick={() => { setActiveView('news'); setSelectedEvent(null); setSelectedArticle(null); }} className={activeView === 'news' ? 'active' : ''}>News</button>
        </nav>
        {renderContent()}
    </div>
  );
};

export default NewsandEvents;