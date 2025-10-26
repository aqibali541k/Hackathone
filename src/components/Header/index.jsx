// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "home" },
    { name: "About", path: "about" },
    { name: "Campaigns", path: "campaigns" },
    { name: "Testimonials", path: "testimonials" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-amber-500/30 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <HeartHandshake className="text-amber-400" />
          <span className="text-amber-300">Donation Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <ScrollLink
              key={item.name}
              to={item.path}
              smooth={true}
              duration={700}
              offset={-80}
              spy={true}
              activeClass="text-amber-400 border-b-2 border-amber-400"
              className="relative font-semibold hover:text-amber-400 transition-all cursor-pointer pb-1"
            >
              {item.name}
            </ScrollLink>
          ))}
        </nav>

        {/* Dashboard Button (Route Navigation) */}
        <button
          onClick={() => navigate("/dashboard")}
          className="hidden md:inline-block cursor-pointer bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold px-6 py-2 rounded-full shadow-lg hover:from-yellow-400 hover:to-amber-500 transition-all"
        >
          Dashboard
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-amber-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/90 backdrop-blur-md border-t border-amber-400/20 px-6 py-4 space-y-4"
        >
          {navItems.map((item) => (
            <ScrollLink
              key={item.name}
              to={item.path}
              smooth={true}
              duration={700}
              offset={-80}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-200 hover:text-amber-400 font-medium cursor-pointer"
            >
              {item.name}
            </ScrollLink>
          ))}

          {/* Donate Scroll Button */}
          <ScrollLink
            to="campaigns"
            smooth={true}
            duration={700}
            offset={-80}
            onClick={() => setMenuOpen(false)}
            className="block bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold text-center px-4 py-2 rounded-full shadow-lg cursor-pointer"
          >
            Donate
          </ScrollLink>

          {/* Dashboard (navigate to route) */}
          <button
            onClick={() => {
              navigate("/dashboard");
              setMenuOpen(false);
            }}
            className="block  w-full text-center border border-amber-400 text-amber-400 font-semibold py-2 rounded-full hover:bg-amber-400 hover:text-black cursor-pointer transition-all"
          >
            Dashboard
          </button>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
