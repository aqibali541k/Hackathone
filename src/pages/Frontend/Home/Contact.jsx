// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin } from "lucide-react";
// import { message } from "antd";
// import axios from "axios";
// import { useAuthContext } from "../../../contexts/Auth/AuthContext";

// const Contact = () => {
//   const [loading, setLoading] = useState(false);
//   const { token } = useAuthContext();
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.message) {
//       return message.error("All fields are required");
//     }
//     if (!token) {
//       return message.error("Please login to send message");
//     }

//     try {
//       setLoading(true);

//       await axios.post(`${import.meta.env.VITE_API_URL}/contact/create`, form, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(import.meta.env.VITE_API_URL);

//       message.success("Message sent successfully ✅");
//       setForm({ name: "", email: "", message: "" });
//     } catch (error) {
//       console.log(error.response?.data || error.message);
//       message.error(
//         error.response?.data?.message || "Failed to send message ❌",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white py-24 px-6">
//       <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
//         {/* INFO */}
//         <div className="space-y-8">
//           <h2 className="text-4xl font-bold text-amber-800">Contact Us</h2>

//           <div className="flex gap-4">
//             <Mail className="text-amber-600" />
//             <span>aqibali555@gmail.com</span>
//           </div>

//           <div className="flex gap-4">
//             <Phone className="text-amber-600" />
//             <span>+92 307 8244507</span>
//           </div>

//           <div className="flex gap-4">
//             <MapPin className="text-amber-600" />
//             <span>Faisalabad, Pakistan</span>
//           </div>
//         </div>

//         {/* FORM */}
//         <motion.form
//           onSubmit={handleSubmit}
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white p-8 rounded-3xl shadow-xl space-y-6"
//         >
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Your Name"
//             className="w-full p-3 border rounded-xl"
//           />

//           <input
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             placeholder="Email Address"
//             className="w-full p-3 border rounded-xl"
//           />

//           <textarea
//             name="message"
//             value={form.message}
//             onChange={handleChange}
//             placeholder="Your Message"
//             rows="5"
//             className="w-full p-3 border rounded-xl"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-amber-500 text-white py-3 rounded-full font-semibold"
//           >
//             {loading ? "Sending..." : "Send Message"}
//           </button>
//         </motion.form>
//       </div>
//     </section>
//   );
// };

// export default Contact;
