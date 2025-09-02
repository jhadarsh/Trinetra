import AboutSimhastha from "../Components/Home/About";
import EventTimeline from "../Components/Home/EventTimeline";
import Feature from "../Components/Home/features";
import HeroSection from "../Components/Home/HeroSection";


export default function Home() {  
  return (
    <div className="bg-[#111827]">
     <HeroSection/>
      <AboutSimhastha/>
      <Feature/>
      <EventTimeline/>
    </div>
  );
}
