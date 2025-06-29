import './WelcomePage.css';
import JoinUs from '../JoinUs/JoinUs';

export default function Welcome() {
  return (
    <div className="welcompage">  
      <div className='hero'>
        <h3>IEEE SSCS Alexandria Powering the Future of Electronics</h3>
        <p>
          Empowering students, researchers, and professionals through innovation, 
          collaboration, and cutting-edge education in solid-state circuits.
        </p>
        <div className='hero_btns_container'>
          <button className='white_btn'>Learn More</button>
          <button className='black_btn'>Join SSCS</button>
        </div>
      </div>
      <JoinUs/>
    </div>
  );
}