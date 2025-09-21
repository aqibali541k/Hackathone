// src/components/Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-auto bg-gradient-to-r from-indigo-600 via-blue-600 to-pink-500 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold mb-1">Donation-Hub</h1>
          <p className="text-sm opacity-80">&copy; {new Date().getFullYear()}. All Rights Reserved</p>
        </div>

        {/* Quick Links */}
        <div className="flex space-x-6">
          <a href="/" className="hover:underline hover:text-gray-200 transition">Home</a>
          <a href="/about" className="hover:underline hover:text-gray-200 transition">About</a>
          <a href="/contact" className="hover:underline hover:text-gray-200 transition">Contact</a>
          <a href="/privacy" className="hover:underline hover:text-gray-200 transition">Privacy</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 text-lg">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gray-200 transition"><FaFacebookF /></a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-gray-200 transition"><FaTwitter /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gray-200 transition"><FaInstagram /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-gray-200 transition"><FaLinkedinIn /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
