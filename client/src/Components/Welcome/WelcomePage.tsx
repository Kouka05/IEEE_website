import JoinUs from '../JoinUs/HeroSection';
import Hero from '../HeroSection/Hero'; 

export default function Welcome() {
  return (
    <div>  
      <Hero navigate={(path: string) => { window.location.href = path; }} />
      <JoinUs/>
    </div>
  );
}