import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Heart, Calendar, ArrowRight } from "lucide-react";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../../components/Loader";

const DonationHistory = () => {
  const { token } = useAuthContext();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/donations/my-donations`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setDonations(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load donation history");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchDonations();
  }, [token]);

  if (loading) return <Loader />;

  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Donations</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <Heart className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Donated</p>
            <p className="text-xl font-bold text-gray-900">
              ₨ {totalDonated.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-xl">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Contributions</p>
            <p className="text-xl font-bold text-gray-900">{donations.length}</p>
          </div>
        </div>
      </div>

      {/* Donation List */}
      {donations.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">You haven't made any donations yet.</p>
          <button onClick={() => navigate("/")} className="btn-primary">
            Browse Campaigns
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {donations.map((d, i) => (
            <motion.div
              key={d._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl p-4 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-4">
                {d.campaign?.images?.[0] ? (
                  <img
                    src={d.campaign.images[0]}
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-blue-400" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {d.campaign?.title || "Campaign"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(d.donatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <span className="text-lg font-bold text-green-600">
                  ₨ {d.amount.toLocaleString()}
                </span>
                {d.campaign?._id && (
                  <button
                    onClick={() => navigate(`/campaigns/${d.campaign._id}`)}
                    className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1"
                  >
                    View <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationHistory;
