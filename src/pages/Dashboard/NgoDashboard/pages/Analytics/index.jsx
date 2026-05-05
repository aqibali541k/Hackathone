import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, DollarSign, TrendingUp, HeartHandshake } from "lucide-react";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";
import Loader from "../../../../../components/Loader";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#6366f1"];

const Analytics = () => {
  const [totalDonors, setTotalDonors] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthContext();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/analytics/donations`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        let donations = 0;
        let donors = 0;

        res.data.forEach((item) => {
          donations += item.donations;
          donors += item.donors;
        });

        setTotalDonations(donations);
        setTotalDonors(donors);
        setMonthlyData(res.data);
      } catch (err) {
        console.error("Error fetching analytics:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchAnalytics();
  }, [token]);

  if (loading) return <Loader />;

  const avgPerDonor = totalDonors > 0 ? Math.round(totalDonations / totalDonors) : 0;
  
  // Mock distribution since backend doesn't provide category analytics yet
  const categoryData = [
    { name: "Health", value: 45 },
    { name: "Education", value: 25 },
    { name: "Disaster", value: 20 },
    { name: "Others", value: 10 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 animate-fade-in max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Performance Overview
          </h2>
          <p className="text-slate-500 mt-1">Track your NGO's impact and donation metrics</p>
        </div>
        <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl font-semibold flex items-center gap-2 border border-emerald-100 shadow-sm">
          <HeartHandshake className="w-5 h-5" /> Active Status
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Raised" 
          value={`₨ ${totalDonations.toLocaleString()}`} 
          icon={<DollarSign className="w-7 h-7 text-white" />} 
          trend="+12.5%" 
          gradient="from-emerald-500 to-teal-400"
        />
        <StatCard 
          title="Total Donors" 
          value={totalDonors.toLocaleString()} 
          icon={<Users className="w-7 h-7 text-white" />} 
          trend="+5.2%" 
          gradient="from-blue-500 to-indigo-400"
        />
        <StatCard 
          title="Avg. Contribution" 
          value={`₨ ${avgPerDonor.toLocaleString()}`} 
          icon={<TrendingUp className="w-7 h-7 text-white" />} 
          trend="+2.1%" 
          gradient="from-amber-500 to-orange-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Donation Growth</h3>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-50 px-3 py-1 rounded-lg">Last 6 Months</span>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData.length > 0 ? monthlyData : [{ month: "No Data", donations: 0 }]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} dy={10} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} tickFormatter={(value) => `₨${value >= 1000 ? value/1000 + 'k' : value}`} dx={-10} />
                <Tooltip
                  contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", padding: "12px 16px" }}
                  itemStyle={{ color: "#0f172a", fontWeight: "bold" }}
                  formatter={(value) => [`₨ ${value.toLocaleString()}`, "Donations"]}
                />
                <Area 
                  type="monotone" 
                  dataKey="donations" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#emeraldGradient)" 
                  activeDot={{ r: 6, strokeWidth: 0, fill: "#10b981" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50 flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Category Distribution</h3>
          <p className="text-sm text-slate-500 mb-6">Where your donations are going</p>
          
          <div className="flex-1 flex justify-center items-center h-[200px]">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  formatter={(value) => [`${value}%`, "Donations"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
             {categoryData.map((cat, i) => (
               <div key={i} className="flex items-center gap-2">
                 <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                 <span className="text-sm font-medium text-slate-600">{cat.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, trend, gradient }) => (
  <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm shadow-slate-200/50 hover:shadow-md transition-shadow relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform duration-500`}></div>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${gradient} shadow-md`}>
        {icon}
      </div>
      <div className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2.5 py-1 rounded-lg">
        {trend}
      </div>
    </div>
    <div>
      <p className="text-slate-500 font-medium text-sm mb-1 uppercase tracking-wide">{title}</p>
      <h4 className="text-3xl font-black text-slate-800 tracking-tight">{value}</h4>
    </div>
  </div>
);

export default Analytics;
