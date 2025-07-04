import JoinUs from '../JoinUs/JoinUs'
import LatestNews from '../LatestNews/LatestNews';  
import Hero from '../HeroSection/Hero'; 

export default function Welcome() {
  return (
    <div>  
      <Hero navigate={(path: string) => { window.location.href = path; }} />
      <LatestNews/>
      <JoinUs/>
    </div>
  );
}