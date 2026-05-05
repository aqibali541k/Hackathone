import React from "react";
import { Carousel } from "antd";
import { motion } from "framer-motion";
import { Heart, Users, Target } from "lucide-react";

const slides = [
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
];

const stats = [
  { icon: <Heart className="w-5 h-5" />, value: "10K+", label: "Donations Made" },
  { icon: <Users className="w-5 h-5" />, value: "5K+", label: "Happy Donors" },
  { icon: <Target className="w-5 h-5" />, value: "200+", label: "Campaigns Funded" },
];

const HeroSection = () => {
  const handleDonateClick = () => {
    const campaignsSection = document.getElementById("campaigns");
    if (campaignsSection) {
      campaignsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-[90vh] flex items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Background Carousel */}
      <div className="absolute inset-0">
        <Carousel autoplay autoplaySpeed={5500} effect="fade">
          {slides.map((img, index) => (
            <div key={index}>
              <div
                className="min-h-[90vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${img})` }}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-blue-600/90 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            Trusted Donation Platform
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Give Hope,<br />
            <span className="text-blue-400">Change Lives</span>
          </h1>

          <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Every donation matters. Join thousands of donors supporting verified NGOs
            across Pakistan — with full transparency and trust.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDonateClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-base"
            >
              ❤️ Donate Now
            </button>
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 text-base hover:bg-white/10"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                {stat.icon}
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-300">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
