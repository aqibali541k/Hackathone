import React from "react";
import { motion } from "framer-motion";
import { Heart, HandHeart, Users, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Spread Love",
    desc: "Your generosity creates a ripple effect of kindness across communities.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: <HandHeart className="w-8 h-8" />,
    title: "Support Humanity",
    desc: "Fund healthcare, education, and emergency relief where it's needed most.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Build Community",
    desc: "Join a growing network of donors committed to lasting positive change.",
    color: "text-green-500",
    bg: "bg-green-50",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Trust & Transparency",
    desc: "Every donation is tracked and reported. See exactly where your money goes.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
];

const AboutSection = () => {
  return (
    <section className="bg-white section-padding">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Why Choose <span className="text-blue-600">Donation Hub</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-12">
            We are dedicated to connecting kind-hearted donors with meaningful
            causes — supporting education, healthcare, and basic needs for those
            who need it most across Pakistan.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300 text-center group"
            >
              <div className={`inline-flex p-4 rounded-2xl ${f.bg} ${f.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
