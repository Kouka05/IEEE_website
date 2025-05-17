import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Welcome from './Components/Welcome/WelcomePage'
import SignUp from './Components/SignUp/SignUp'
import Login from './Components/LoginPage/LoginPage'
import './App.css'


function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
          <Route path="/" element={< Welcome/>}/>
             <Route path="/signup" element={<SignUp/>}/>
             <Route path="/login" element={<Login/>} />
             <Route path="/*" element={<Welcome/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
