import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout' 
import Welcome from './Components/Welcome/WelcomePage'
import SignUp from './Components/SignUp/SignUp'
import Login from './Components/LoginPage/LoginPage'
import AboutPage from './Components/About/about'  
import Call from './Components/Call/Call'
import NewsandEvents from './Components/NewsandEvents/NewsandEvents'
import  Events  from './Components/Events/Events'
import News from './Components/News/News'
import ElectionPage from './Components/Elections/Election'
import CreateEvent from './Components/CreateEvent/CreateEvent';
import ElectionResults from './Components/Elections/ElectionResults'
import CandidateProfile from './Components/Elections/CandidateProfile';


function App() {
  return (
<div className="App">
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Welcome />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/*" element={<Welcome />} />
        <Route path="/call" element={<Call setPage={() => {}} />} />
        <Route path="/newsandevents" element={<NewsandEvents />} />
        <Route path="/events" element={<Events />} />
        <Route path="/news" element={<News />} />
        <Route path="/Aelection" element={<ElectionPage setPage={() => {}} />} />
        <Route path="/election" element={<ElectionResults setPage={() => {}} />} />
        <Route path="/election/:candidateId" element={<CandidateProfile setPage={() => {}} />} />
        <Route path="/createevent" element={<CreateEvent />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
</div>
  )
}

export default App;