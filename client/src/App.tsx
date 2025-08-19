import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout' 
import Welcome from './Components/Welcome/WelcomePage'
import SignUp from './Components/SignUp/SignUp'
import Login from './Components/LoginPage/LoginPage'
import NewsandEvents from './Components/NewsandEvents/NewsandEvents'
import  Events  from './Components/Events/Events'
import News from './Components/News/News'
import CreateEvent from './Components/CreateEvent/CreateEvent';
import About from './Components/About/About';
import ContactPartner from './Components/Contact/ContactPartner';
import ContactSpeaker from './Components/Contact/ContactSpeaker';
import './App.css'
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Welcome />} />
              <Route path="/*" element={<Welcome />} />
              <Route path="/newsandevents" element={<NewsandEvents />} />
              <Route path="/events" element={<Events />} />
              <Route path="/news" element={<News />} />
              <Route path="/createevent" element={<CreateEvent />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact/partner" element={<ContactPartner />} />
              <Route path="/contact/speaker" element={<ContactSpeaker />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App;