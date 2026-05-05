import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ali Raza",
    role: "Regular Donor",
    feedback:
      "Donating here was easy and deeply fulfilling. The transparency is unmatched — I can see exactly where my money goes.",
  },
  {
    name: "Sara Khan",
    role: "Monthly Contributor",
    feedback:
      "I admire their dedication to every cause. Knowing that verified NGOs handle my donations gives me confidence.",
  },
  {
    name: "Ahmed Ali",
    role: "Corporate Donor",
    feedback:
      "A trustworthy and heartfelt organization. Our company has been proudly contributing regularly through this platform.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="bg-white section-padding">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
          Testimonials
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
          What Our Donors Say
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
          Real stories from people who chose to make a difference.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300 relative"
          >
            {/* Quote Icon */}
            <div className="absolute -top-4 left-6 bg-blue-600 p-2.5 rounded-xl shadow-sm">
              <Quote className="w-4 h-4 text-white" />
            </div>

            {/* Feedback */}
            <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-6">
              "{t.feedback}"
            </p>

            {/* Divider */}
            <div className="h-px w-10 bg-blue-200 mb-3" />

            {/* Name */}
            <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
            <p className="text-xs text-gray-400">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
