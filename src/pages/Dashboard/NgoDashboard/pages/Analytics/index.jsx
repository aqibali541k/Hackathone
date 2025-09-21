import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Analytics = () => {
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/analytics/donations");

        let donations = 0;
        let donors = 0;

        res.data.forEach(item => {
          donations += item.donations; // total donation amount
          donors += item.donors;       // total unique donors
        });

        setTotalDonations(donations);
        setTotalDonors(donors);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const chartData = [
    { name: "Total Donations", value: totalDonations },
    { name: "Total Donors", value: totalDonors },
  ];

  if (loading) return <div className="p-6">Loading analytics...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">NGO Dashboard Analytics</h2>

      <div className="mb-8">
        <ResponsiveContainer width="60%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" barSize={60} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-lg font-semibold mt-6">
        <p>Total Donations Collected: ${totalDonations.toLocaleString()}</p>
        <p>Total Donors: {totalDonors}</p>
      </div>
    </div>
  );
};

export default Analytics;
