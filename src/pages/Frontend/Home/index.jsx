// src/pages/public/Home.jsx
import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import CampaignsSection from "./CampaignsSection";
import TestimonialsSection from "./TestimonialSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <CampaignsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Home;
