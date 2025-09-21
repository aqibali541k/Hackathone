// src/pages/public/TestimonialsSection.jsx
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Ali Raza", feedback: "Donating here was easy and impactful!" },
  { name: "Sara Khan", feedback: "I love how transparent the NGO is with funds." },
  { name: "Ahmed Ali", feedback: "A great platform to help those in need." },
];

const TestimonialsSection = () => {
  return (
    <section className="px-6 py-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center drop-shadow-lg">
        What Our Donors Say
      </h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="p-6 bg-white rounded-2xl shadow-lg text-gray-800 hover:shadow-2xl transition-all duration-300"
          >
            <p className="text-lg mb-4 italic">"{t.feedback}"</p>
            <p className="font-bold text-right text-indigo-600">- {t.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Optional: Add a 'Load More' button if there are many testimonials */}
      {/* <div className="flex justify-center mt-8">
        <button className="px-6 py-3 rounded-full bg-white text-indigo-600 font-semibold hover:bg-indigo-100 transition-all">
          Load More
        </button>
      </div> */}
    </section>
  );
};

export default TestimonialsSection;
