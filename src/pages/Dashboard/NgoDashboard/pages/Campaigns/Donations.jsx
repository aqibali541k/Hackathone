import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, List, Spin, message, Avatar, Divider } from "antd";
import { motion } from "framer-motion";
import { FaDonate } from "react-icons/fa";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";

const Donations = () => {
  const { token } = useAuthContext();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [donationsMap, setDonationsMap] = useState({}); // { campaignId: [donations] }

  // Fetch NGO campaigns
  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/campaigns/my-campaigns", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCampaigns(res.data);

      // Fetch donations for each campaign
      const map = {};
      await Promise.all(
        res.data.map(async (camp) => {
          const donRes = await axios.get(
            `http://localhost:8000/donations/campaign/${camp._id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          map[camp._id] = donRes.data;
        })
      );
      setDonationsMap(map);
    } catch (err) {
      console.error(err);
      message.error("Failed to load campaigns or donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchCampaigns();
  }, [token]);

  if (loading)
    return <Spin size="large" className="flex justify-center items-center mt-20" />;

  return (
    <div className="space-y-8 px-4 py-6 md:px-10 lg:px-20">
      {campaigns.map((camp) => (
        <motion.div
          key={camp._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-white shadow-2xl rounded-3xl p-6 md:p-8"
        >
          {/* Campaign Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <div className="flex items-center space-x-4">
              <Avatar
                size={64}
                src={camp.imageUrl || "/default-campaign.jpg"}
                className="shadow-md border-2 border-blue-200"
              />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {camp.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-base">{camp.category}</p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-700">
                <strong>Status:</strong> {camp.status}
              </p>
              <p className="text-gray-700">
                <strong>Goal:</strong> ₨ {camp.goalAmount.toLocaleString()}
              </p>
              <p className="text-gray-700">
                <strong>Raised:</strong> ₨ {camp.raisedAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <Divider className="border-blue-200" />

          {/* Donations List */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <FaDonate className="text-green-500" /> Recent Donations
            </h3>
            {donationsMap[camp._id]?.length === 0 ? (
              <p className="text-gray-500 text-center py-4 bg-blue-50 rounded-xl">
                No donations yet. Be the first donor!
              </p>
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={donationsMap[camp._id]}
                className="bg-white rounded-xl p-4 shadow-inner"
                renderItem={(don) => (
                  <List.Item className="hover:bg-blue-50 transition-all rounded-lg p-2 md:p-3">
                    <List.Item.Meta
                      avatar={
                        <Avatar className="bg-green-200 text-green-700">
                          {don.donor.firstName.charAt(0)}
                        </Avatar>
                      }
                      title={`${don.donor.firstName} ${don.donor.lastName}`}
                      description={`Donated ₨ ${don.amount.toLocaleString()} on ${new Date(
                        don.donatedAt
                      ).toLocaleString()}`}
                    />
                  </List.Item>
                )}
              />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Donations;
