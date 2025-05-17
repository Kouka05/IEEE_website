import './WelcomePage.css'
import Navbar from '../Navbar/Navbar'
import JoinUs from '../JoinUs/JoinUs'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom'

export default function Welcome(){
    const navigate = useNavigate();
    return(
        <div className="welcompage">  
          <Navbar/>
          <div className='hero'>
            <h3>IEEE SSCS Alexandria 
            Powering the Future of Electronics</h3>
            <p>Empowering students, researchers, and professionals through innovation, collaboration, and cutting-edge 
            education in solid-state circuits.</p>
            <div className='hero_btns_container'>
                <button className='white_btn'>Learn More</button>
                <button className='black_btn' onClick={()=>navigate("/signup")}>Join SSCS</button>
            </div>
           </div>
        <JoinUs/>
        <Footer/>
            
        </div>
    )
}