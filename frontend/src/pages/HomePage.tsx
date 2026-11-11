import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { StatsBar } from '../components/home/StatsBar';
import { CompanyLogos } from '../components/home/CompanyLogos';
import { ProgramCards } from '../components/home/ProgramCards';
import { OpenSlots } from '../components/home/OpenSlots';
import { LatestNewsSection } from '../components/home/LatestNewsSection';
import { TestimonialSection } from '../components/home/TestimonialSection';
import { ContactSection } from '../components/home/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col bg-white">
      {/* 1. Hero Section matching Image 1 */}
      <HeroSection />

      {/* 2. They Started Where You Are Today (About) matching Image 1 */}
      <AboutSection />

      {/* 3. Our Impact in Numbers matching Image 1 */}
      <StatsBar />

      {/* 4. Our Alumni Trusted by Companies matching Image 1 */}
      <CompanyLogos />

      {/* 5. Stay Connected Through Events matching Image 1 */}
      <ProgramCards />

      {/* 6. Explore Latest Job Opportunities (6 Jobs + View All) matching Image 1 */}
      <OpenSlots />

      {/* 7. Latest News (4 Cards + View All News) matching Image 1 */}
      <LatestNewsSection />

      {/* 8. Hear Our Alumni Voices (Testimonials) matching Image 1 */}
      <TestimonialSection />

      {/* 9. Connected With Us, We're Here to Help (Contact) matching Image 1 */}
      <ContactSection />
    </div>
  );
};

export default HomePage;
