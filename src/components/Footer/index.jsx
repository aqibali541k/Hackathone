// src/components/Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { HeartHandshake } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-amber-50 via-yellow-100 to-rose-100 text-gray-800 py-12 overflow-hidden">
      {/* Soft gradient overlay for glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,200,150,0.25),_transparent_60%)] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
        {/* Branding Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <div className="flex items-center gap-2 mb-2">
            <HeartHandshake className="text-amber-600 w-6 h-6" />
            <h1 className="text-2xl font-extrabold text-amber-700">
              Donation Hub
            </h1>
          </div>
          <p className="text-sm text-gray-600 max-w-xs">
            Empowering kindness, one contribution at a time. Join us in making
            a difference.
          </p>
          <p className="mt-3 text-xs text-gray-500">
            © {new Date().getFullYear()} Donation Hub. All rights reserved.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center space-y-2"
        >
          <h3 className="font-bold text-lg text-amber-700 mb-2">
            Quick Links
          </h3>
          <div className="flex flex-col space-y-2 text-gray-700 text-sm font-medium">
            {[
              { name: "Home", to: "home" },
              { name: "About", to: "about" },
              { name: "Campaigns", to: "campaigns" },
              { name: "Testimonials", to: "testimonials" },
            ].map((link) => (
              <ScrollLink
                key={link.name}
                to={link.to}
                smooth={true}
                duration={700}
                offset={-80}
                className="hover:text-amber-500 transition cursor-pointer"
              >
                {link.name}
              </ScrollLink>
            ))}
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col items-center space-y-3"
        >
          <h3 className="font-bold text-lg text-amber-700">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            {[
              { icon: <FaFacebookF />, link: "https://facebook.com" },
              { icon: <FaTwitter />, link: "https://twitter.com" },
              { icon: <FaInstagram />, link: "https://instagram.com" },
              { icon: <FaLinkedinIn />, link: "https://linkedin.com" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-amber-700 hover:text-rose-500 transition"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Divider Line */}
      <div className="mt-10 border-t border-amber-300/40 w-[90%] mx-auto"></div>
    </footer>
  );
};

export default Footer;
