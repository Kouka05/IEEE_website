// server.js

// 1. Import necessary packages using ES Module syntax
import express from 'express';
import cors from 'cors';

// 2. Initialize the Express app
const app = express();
const PORT = 4000; // Define a port for the server

// 3. Middleware Setup
// Use CORS to allow cross-origin requests from your React app (which runs on a different port)
app.use(cors());
// Use express.json() to parse JSON bodies in requests
app.use(express.json());


// 4. Mock Data (This is now your "database")
const eventsData = [
    { id: 1, date: new Date('2025-06-14T22:00:00'), title: 'SSCS Lorum Ipsum Event Place Holder', description: 'At vero eos et accusamus et iusto', location: 'Online', abstract: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse venenatis ipsum commodo enim vehicula, sit amet porttitor magna vehicula. In eget nulla quis enim pharetra venenatis fringilla eget ante. Mauris euismod odio dolor, in auctor nulla iaculis et. Duis convallis augue eget libero porttitor sollicitudin sit amet id justo.', locationUrl: 'https://maps.app.goo.gl/Bqk4o1A489oFczgf9' },
    { id: 2, date: new Date('2025-06-23T23:00:00'), title: 'SSCS Lorum Ipsum Event Place Holder', description: 'At vero eos et accusamus et iusto', location: 'Offline', abstract: 'This is the abstract for the second event. It provides a more detailed summary of what will be covered, who the speakers are, and what attendees can expect to learn. We look forward to seeing you there for this insightful session.', locationUrl: 'https://maps.app.goo.gl/Bqk4o1A489oFczgf9' },
    { id: 3, date: new Date('2025-07-14T22:00:00'), title: 'SSCS Lorum Ipsum Event Place Holder', description: 'At vero eos et accusamus et iusto', location: 'Online', abstract: 'Join us for the third event in our series. This abstract covers the key topics of discussion, including emerging trends and future outlooks. A perfect opportunity for networking and professional development.', locationUrl: 'https://maps.app.goo.gl/Bqk4o1A489oFczgf9' },
    { id: 4, date: new Date('2025-07-28T20:00:00'), title: 'Another Awesome Tech Conference', description: 'Join us for a deep dive into modern web technologies.', location: 'Online', abstract: 'A deep dive into the latest advancements in web development. This conference will feature talks from industry leaders on topics like React, Vue, Svelte, and the future of the web. Bring your questions for the Q&A session.', locationUrl: 'https://maps.app.goo.gl/Bqk4o1A489oFczgf9' },
];

const newsData = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    imageUrl: '', // Placeholder
    title: 'Local Chapter. Global Impact.',
    content: `This is the full content for the news article titled "Local Chapter. Global Impact." Article number ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
}));


// 5. API Endpoints
// This is where the React app will send its requests.

// GET endpoint for all events
app.get('/api/events', (req, res) => {
  console.log('GET /api/events - Request received');
  res.json(eventsData);
});

// GET endpoint for all news articles
app.get('/api/news', (req, res) => {
  console.log('GET /api/news - Request received');
  res.json(newsData);
});

// Optional: GET endpoint for a single event by ID
app.get('/api/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    const event = eventsData.find(e => e.id === eventId);
    if (event) {
        console.log(`GET /api/events/${eventId} - Found`);
        res.json(event);
    } else {
        console.log(`GET /api/events/${eventId} - Not Found`);
        res.status(404).json({ message: 'Event not found' });
    }
});


// 6. Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`  GET http://localhost:${PORT}/api/events`);
  console.log(`  GET http://localhost:${PORT}/api/news`);
});
