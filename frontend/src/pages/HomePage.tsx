import React from 'react';
import { TopNewsBar } from '../components/home/TopNewsBar';
import { HeroSection } from '../components/home/HeroSection';
import { StatsBar } from '../components/home/StatsBar';
import { CompanyLogos } from '../components/home/CompanyLogos';
import { ProgramCards } from '../components/home/ProgramCards';
import { OpenSlots } from '../components/home/OpenSlots';
import { AboutSection } from '../components/home/AboutSection';
import { TestimonialSection } from '../components/home/TestimonialSection';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col bg-white">
      {/* 1. Top News Ticker/Cards */}
      <div id="news">
        <TopNewsBar />
      </div>

      {/* 2. Expansive Hero Banner */}
      <HeroSection />

      {/* 3. Our Impact in Numbers (Exact Image 3 Layout) */}
      <StatsBar />

      {/* 4. Our Alumni Trusted by Companies */}
      <CompanyLogos />

      {/* 5. Stay Connected Through Events (Exact Image 3 Layout) */}
      <ProgramCards />

      {/* 6. Explore Latest Job Opportunities (Exact Image 3 Layout) */}
      <OpenSlots />

      {/* 7. They Started Where You Are Today (Exact Image 2 Layout) */}
      <AboutSection />

      {/* 8. Hear Our Alumni Voices (Exact Image 2 Layout) */}
      <TestimonialSection />

      {/* 9. Connected With Us, We're Here to Help (Exact Image 2 Layout) */}
      <ContactSection />
    </div>
  );
};

export default HomePage;
