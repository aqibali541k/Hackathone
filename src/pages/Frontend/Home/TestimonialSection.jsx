// src/pages/public/TestimonialsSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ali Raza",
    feedback: "Donating here was easy and deeply fulfilling. You can truly see the impact.",
  },
  {
    name: "Sara Khan",
    feedback: "I admire their transparency and dedication to every cause they support.",
  },
  {
    name: "Ahmed Ali",
    feedback: "A trustworthy and heartfelt organization—proud to contribute regularly.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative px-6 py-20 bg-gradient-to-br from-amber-50 via-yellow-100 to-rose-100 text-gray-800 overflow-hidden">
      {/* Elegant texture overlay */}
      <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-20 mix-blend-overlay"></div>

      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold mb-16 text-center text-amber-700 drop-shadow-md"
      >
        Voices of Generosity
      </motion.h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            whileHover={{
              scale: 1.05,
              rotate: 0.5,
              boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
            }}
            className="relative p-8 bg-gradient-to-br from-white/90 to-amber-50/70 backdrop-blur-sm border border-amber-200 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-500 hover:border-amber-400"
          >
            {/* Decorative glow border */}
            <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-amber-300 opacity-0 hover:opacity-30 transition-all duration-700 pointer-events-none"></div>

            {/* Quote icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-amber-200/60 p-3 rounded-full shadow-inner">
                <Quote className="w-8 h-8 text-amber-700" />
              </div>
            </div>

            <p className="text-lg text-gray-700 italic leading-relaxed mb-6 text-center">
              "{t.feedback}"
            </p>

            <p className="text-right font-semibold text-amber-700 text-xl italic font-[cursive]">
              — {t.name}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
