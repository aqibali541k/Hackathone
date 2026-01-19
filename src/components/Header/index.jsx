import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "home" },
    { name: "About", path: "about" },
    { name: "Campaigns", path: "campaigns" },
    { name: "Testimonials", path: "testimonials" },
  ];

  const handleNavClick = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 120);
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            <button
              key={item.name}
              onClick={() => handleNavClick(item.path)}
              className="relative font-semibold pb-1 transition-all
              hover:text-amber-400 after:absolute after:left-0 after:-bottom-1
              after:h-[2px] after:w-0 after:bg-amber-400
              after:transition-all hover:after:w-full"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Dashboard Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="hidden md:inline-block bg-gradient-to-r from-amber-400 to-yellow-500
          text-black font-semibold px-6 py-2 rounded-full shadow-lg
          hover:from-yellow-400 hover:to-amber-500 transition-all"
        >
          Dashboard
        </button>

        {/* Mobile Toggle */}
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
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-black/90 backdrop-blur-md
          border-t border-amber-400/20 px-6 py-4 space-y-4"
        >
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                handleNavClick(item.path);
                setMenuOpen(false);
              }}
              className="block w-full text-left text-gray-200
              hover:text-amber-400 font-medium transition-all"
            >
              {item.name}
            </button>
          ))}

          {/* Donate Shortcut */}
          <button
            onClick={() => {
              handleNavClick("campaigns");
              setMenuOpen(false);
            }}
            className="block w-full bg-gradient-to-r from-amber-400 to-yellow-500
            text-black font-semibold text-center px-4 py-2 rounded-full shadow-lg"
          >
            Donate
          </button>

          {/* Dashboard */}
          <button
            onClick={() => {
              navigate("/dashboard");
              setMenuOpen(false);
            }}
            className="block w-full text-center border border-amber-400
            text-amber-400 font-semibold py-2 rounded-full
            hover:bg-amber-400 hover:text-black transition-all"
          >
            Dashboard
          </button>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
