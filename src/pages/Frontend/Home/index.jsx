// src/pages/public/Home.jsx
import React from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import CampaignsSection from "./CampaignsSection";
import TestimonialsSection from "./TestimonialSection";

const Home = () => {
  return (
    <div>
      <section id="hero">
        <HeroSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="campaigns">
        <CampaignsSection />
      </section>

      <section id="testimonials">
        <TestimonialsSection />
      </section>
    </div>
  );
};

export default Home;
