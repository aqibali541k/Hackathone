import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { Users, DollarSign } from "lucide-react";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";
import Loader from "../../../../../components/Loader";

const Analytics = () => {
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthContext(); // ✅ get token

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/analytics/donations`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ send token
            },
          },
        );

        let donations = 0;
        let donors = 0;

        res.data.forEach((item) => {
          donations += item.donations;
          donors += item.donors;
        });

        setTotalDonations(donations);
        setTotalDonors(donors);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchAnalytics();
  }, [token]);

  const chartData = [
    { name: "Total Donations", value: totalDonations },
    { name: "Total Donors", value: totalDonors },
  ];

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500">
        <Loader />
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        📊 NGO Analytics Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 shadow-lg rounded-2xl flex items-center gap-4 border-l-4 border-indigo-500"
        >
          <div className="p-3 bg-indigo-100 text-yellow-600 rounded-full">
            <DollarSign size={28} />
          </div>
          <div>
            <h3 className="text-gray-600 text-lg">Total Donations</h3>
            <p className="text-2xl font-semibold text-gray-800">
              ${totalDonations.toLocaleString()}
            </p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-6 shadow-lg rounded-2xl flex items-center gap-4 border-l-4 border-green-500"
        >
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <Users size={28} />
          </div>
          <div>
            <h3 className="text-gray-600 text-lg">Total Donors</h3>
            <p className="text-2xl font-semibold text-gray-800">
              {totalDonors}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Donation Overview
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Bar
              dataKey="value"
              fill="url(#colorGradient)"
              barSize={60}
              radius={[10, 10, 0, 0]}
            />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#A5B4FC" stopOpacity={0.7} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;
