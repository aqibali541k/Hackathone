import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return toast.error("All fields are required");
    }
    setLoading(true);
    
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/contact/submit`, form);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
            Contact Us
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Have questions? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Mail className="text-blue-600 w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-gray-500 text-sm">support@donationhub.pk</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-xl">
                <Phone className="text-green-600 w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Phone</p>
                <p className="text-gray-500 text-sm">+92 307 8244507</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-50 rounded-xl">
                <MapPin className="text-amber-600 w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Location</p>
                <p className="text-gray-500 text-sm">Faisalabad, Pakistan</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-4"
          >
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary !py-3"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
