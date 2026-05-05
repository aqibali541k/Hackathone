import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Heart, TrendingUp } from "lucide-react";

const CampaignsSection = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  const categories = ["all", "health", "education", "disaster", "others"];

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/campaigns/readall`,
        );
        const data = Array.isArray(res.data) ? res.data : [];
        setCampaigns(data);
        setFilteredCampaigns(data);
      } catch (err) {
        console.error(err);
        setCampaigns([]);
        setFilteredCampaigns([]);
      }
    };
    fetchCampaigns();
  }, []);

  useEffect(() => {
    let filtered = campaigns;
    if (activeCategory !== "all") {
      filtered = filtered.filter((c) => c.category === activeCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredCampaigns(filtered);
  }, [searchTerm, activeCategory, campaigns]);

  return (
    <div className="bg-gray-50 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Make a Difference
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Active Campaigns
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Browse verified campaigns and support the causes you care about.
          </p>
        </motion.div>

        {/* Search + Category Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((c, i) => {
              const raised = c.raisedAmount || 0;
              const goal = c.goalAmount || 1;
              const progress = Math.min((raised / goal) * 100, 100);
              return (
                <motion.div
                  key={c._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  onClick={() => navigate(`/campaigns/${c._id}`)}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-44">
                    <img
                      src={c?.images?.[0] || "https://via.placeholder.com/400x200?text=Campaign"}
                      alt={c.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span
                      className={`absolute top-3 right-3 px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                        c.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {c.status === "active" ? "Active" : "Closed"}
                    </span>
                    <div className="absolute top-3 left-3 bg-white/90 rounded-full px-2.5 py-0.5 text-xs font-medium text-gray-600">
                      {c.category?.charAt(0).toUpperCase() + c.category?.slice(1)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 truncate">
                      {c.title}
                    </h3>
                    <p className="text-gray-500 text-xs line-clamp-2 mb-3">
                      {c.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1.5 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          ₨ {(c.raisedAmount || 0).toLocaleString()}
                        </span>
                        <span>Goal: ₨ {(c.goalAmount || 0).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Donate Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/campaigns/${c._id}`);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      Donate Now
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg">No campaigns found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignsSection;
