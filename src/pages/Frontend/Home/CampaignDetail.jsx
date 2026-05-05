import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Progress, Button, Input, message, Carousel } from "antd";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ShieldCheck, CreditCard } from "lucide-react";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";
import Loader from "../../../components/Loader";

const optimizeImage = (url) =>
  url
    ? url.replace("/upload/", "/upload/w_1400,q_auto,f_auto/")
    : "https://via.placeholder.com/1400x700?text=No+Image";

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useAuthContext();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donating, setDonating] = useState(false);

  const [form, setForm] = useState({
    name: user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "",
    email: user?.email || "",
    amount: "",
  });

  const fetchCampaign = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/campaigns/read/${id}`,
      );
      setCampaign(res.data);
    } catch {
      message.error("Failed to load campaign");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaign();
  }, [id]);

  const handleDonate = async () => {
    const { name, email, amount } = form;

    if (!name || !email || !amount) {
      return message.error("Please fill all fields");
    }
    if (Number(amount) <= 0) {
      return message.error("Please enter a valid amount");
    }

    if (!token) {
      message.warning("Please login to donate");
      navigate("/auth/login");
      return;
    }

    setDonating(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/donations/create`,
        { campaignId: id, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      message.success("Thank you for your generous donation!");
      setForm({ ...form, amount: "" });
      fetchCampaign();
    } catch {
      message.error("Donation failed. Please try again.");
    } finally {
      setDonating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-32">
        <p className="text-gray-500 text-lg">Campaign not found</p>
        <button onClick={() => navigate("/")} className="btn-primary mt-4">
          Go Home
        </button>
      </div>
    );
  }

  const progress = Math.min(
    (campaign.raisedAmount / campaign.goalAmount) * 100,
    100,
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="overflow-hidden rounded-2xl shadow-md bg-white">
              <Carousel autoplay>
                {(campaign.images?.length
                  ? campaign.images
                  : ["https://via.placeholder.com/1400x700"]
                ).map((img, index) => (
                  <div key={index} className="h-[300px] sm:h-[380px] lg:h-[420px]">
                    <img
                      src={optimizeImage(img)}
                      alt={`campaign-${index}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            {/* Campaign Info */}
            <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  campaign.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {campaign.status === "active" ? "Active" : "Closed"}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-600">
                  {campaign.category?.charAt(0).toUpperCase() + campaign.category?.slice(1)}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {campaign.title}
              </h1>
              <p className="text-gray-600 leading-relaxed">
                {campaign.description}
              </p>
            </div>
          </motion.div>

          {/* Right: Donation Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Progress Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Raised</span>
                <span className="font-semibold text-gray-900">
                  {progress.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Raised</p>
                  <p className="font-bold text-green-600">
                    ₨ {campaign.raisedAmount?.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs">Goal</p>
                  <p className="font-bold text-gray-900">
                    ₨ {campaign.goalAmount?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Donation Form */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-blue-600" />
                Make a Donation
              </h3>

              <div className="space-y-3">
                <input
                  placeholder="Your Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <input
                  placeholder="Email Address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <input
                  type="number"
                  placeholder="Donation Amount (PKR)"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  min="1"
                />

                <button
                  onClick={handleDonate}
                  disabled={donating}
                  className="w-full btn-primary !py-3 !text-base disabled:opacity-50"
                >
                  {donating ? "Processing..." : "Donate Now"}
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex flex-wrap gap-4 justify-center text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Verified NGO
                </span>
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-blue-500" />
                  Secure Payment
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500" />
                  100% Goes to Cause
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
