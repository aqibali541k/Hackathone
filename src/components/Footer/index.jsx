import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { HeartHandshake, ShieldCheck, Eye, Lock } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 pb-12 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Verified NGOs</p>
              <p className="text-gray-400 text-xs">All organizations are verified</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Eye className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Transparent Donations</p>
              <p className="text-gray-400 text-xs">Track every rupee you donate</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg">
              <Lock className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Secure Payments</p>
              <p className="text-gray-400 text-xs">SSL encrypted transactions</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Branding Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <HeartHandshake className="text-blue-400 w-6 h-6" />
              <h1 className="text-xl font-bold text-white">
                Donation<span className="text-blue-400">Hub</span>
              </h1>
            </div>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              Empowering communities through collective generosity. Join thousands of donors making a real difference in Pakistan.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <div className="flex flex-col space-y-2 text-sm">
              {[
                { name: "Home", to: "home" },
                { name: "About", to: "about" },
                { name: "Campaigns", to: "campaigns" },
                { name: "Testimonials", to: "testimonials" },
                { name: "Contact", to: "contact" },
              ].map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={700}
                  offset={-80}
                  className="text-gray-400 hover:text-blue-400 transition cursor-pointer"
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
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-3">
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
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-200"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Donation Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
