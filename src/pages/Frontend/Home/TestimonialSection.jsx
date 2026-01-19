// src/pages/public/TestimonialsSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ali Raza",
    feedback:
      "Donating here was easy and deeply fulfilling. You can truly see the impact.",
  },
  {
    name: "Sara Khan",
    feedback:
      "I admire their transparency and dedication to every cause they support.",
  },
  {
    name: "Ahmed Ali",
    feedback:
      "A trustworthy and heartfelt organization — proud to contribute regularly.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-[#fff7ed] via-[#ffedd5] to-[#fff] overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl"></div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 relative z-10"
      >
        <p className="text-sm uppercase tracking-widest text-amber-600 font-semibold">
          Testimonials
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-amber-900 mt-2">
          Words From Our Supporters
        </h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto text-sm md:text-base">
          Real stories from people who chose to spread kindness and hope.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="relative z-10 max-w-7xl mx-auto grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{
              y: -12,
              rotate: 0.5,
              boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
            }}
            className="
              relative bg-white/90 backdrop-blur-xl
              border border-amber-200
              rounded-3xl p-8
              transition-all duration-500
            "
          >
            {/* Floating Quote */}
            <div className="absolute -top-6 left-6 bg-gradient-to-br from-amber-400 to-orange-500 p-4 rounded-2xl shadow-lg">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Feedback */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed italic mt-8 mb-8">
              “{t.feedback}”
            </p>

            {/* Divider */}
            <div className="h-px w-12 bg-amber-400 mb-4"></div>

            {/* Name */}
            <p className="font-semibold text-amber-800 text-sm md:text-base">
              {t.name}
            </p>
            <p className="text-xs text-gray-500">Supporter</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
