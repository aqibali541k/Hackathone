import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthContext } from "../../contexts/Auth/AuthContext";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, user, handleLogout } = useAuthContext();

  const navItems = [
    { name: "Home", path: "home" },
    { name: "About", path: "about" },
    { name: "Campaigns", path: "campaigns" },
    { name: "Testimonials", path: "testimonials" },
    { name: "Contact", path: "contact" },
  ];

  const handleNavClick = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
          <HeartHandshake className="text-blue-600 w-7 h-7" />
          <span>Donation<span className="text-blue-600">Hub</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.path)}
              className="text-gray-600 font-medium hover:text-blue-600 transition-colors duration-200 text-sm"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuth ? (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="btn-primary !py-2 !px-5 !text-sm"
              >
                Dashboard
              </button>
              <button
                onClick={() => { handleLogout(); navigate("/"); }}
                className="text-gray-500 hover:text-red-500 text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/auth/login")}
                className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/auth/register")}
                className="btn-primary !py-2 !px-5 !text-sm"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-3 overflow-hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className="block w-full text-left text-gray-600 hover:text-blue-600 font-medium py-1 transition-colors"
              >
                {item.name}
              </button>
            ))}

            <div className="pt-3 border-t border-gray-100 space-y-2">
              {isAuth ? (
                <>
                  <button
                    onClick={() => { navigate("/dashboard"); setMenuOpen(false); }}
                    className="w-full btn-primary !text-sm"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => { handleLogout(); navigate("/"); setMenuOpen(false); }}
                    className="w-full text-center text-red-500 font-medium py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { navigate("/auth/login"); setMenuOpen(false); }}
                    className="w-full btn-secondary !text-sm"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { navigate("/auth/register"); setMenuOpen(false); }}
                    className="w-full btn-primary !text-sm"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
