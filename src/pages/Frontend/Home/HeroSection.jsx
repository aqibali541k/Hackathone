import React from "react";
import { Button, Carousel } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const slides = [
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
];

const HeroSection = () => {
  // Smooth scroll to Campaigns section
  const handleDonateClick = () => {
    const campaignsSection = document.getElementById("campaigns");
    if (campaignsSection) {
      campaignsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full h-[85vh] flex items-center justify-center text-center text-white overflow-hidden font-serif"
    >
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <Carousel autoplay autoplaySpeed={5500} effect="scrollx">
          {slides.map((img, index) => (
            <div key={index}>
              <div
                className="h-[85vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-amber-900/40 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 py-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-amber-200 drop-shadow-lg leading-tight">
          Give Hope, Change Lives
        </h1>

        <p className="text-lg md:text-xl mb-10 text-amber-100 max-w-2xl mx-auto leading-relaxed">
          Every donation is a step toward a brighter tomorrow. Join us in
          spreading kindness, compassion, and care to those who need it most.
        </p>

        <Button
          type="primary"
          size="large"
          onClick={handleDonateClick}
          icon={<HeartOutlined />}
          className="
            !bg-gradient-to-r !from-amber-400 !to-orange-600
            !hover:from-orange-500 !hover:to-amber-500
            !text-white !font-semibold
            !px-8 !py-5
            !rounded-full
            !shadow-2xl
            !transition-all !duration-300
            hover:scale-105
            !border-none
          "
        >
          Donate Now
        </Button>
      </div>

      {/* Decorative Strip */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center gap-8 text-amber-300 text-sm opacity-80">
        <span>❤️ Empower Communities</span>
        <span>🌍 Spread Kindness</span>
        <span>🤝 Be the Change</span>
      </div>
    </section>
  );
};

export default HeroSection;
