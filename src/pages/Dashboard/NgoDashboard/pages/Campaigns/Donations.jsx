import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Spin, message, Avatar, Divider, Carousel } from "antd";
import { motion } from "framer-motion";
import { FaDonate } from "react-icons/fa";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";

const Donations = () => {
  const { token } = useAuthContext();
  const [campaigns, setCampaigns] = useState([]);
  const [donationsMap, setDonationsMap] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/campaigns/my-campaigns`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setCampaigns(res.data);

      const map = {};
      await Promise.all(
        res.data.map(async (camp) => {
          const donRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/donations/campaign/${camp._id}`,
            { headers: { Authorization: `Bearer ${token}` } },
          );
          map[camp._id] = donRes.data;
        }),
      );

      setDonationsMap(map);
    } catch (error) {
      message.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchCampaigns();
  }, [token]);

  if (loading) {
    return <Spin size="large" className="flex justify-center mt-20" />;
  }

  return (
    <div className="px-4 py-6 md:px-10 lg:px-20 space-y-6">
      {campaigns.map((camp) => (
        <motion.div
          key={camp._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-200 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="w-full md:w-1/3">
              <Carousel autoplay className="rounded-xl overflow-hidden">
                {(camp.images?.length
                  ? camp.images
                  : ["/default-campaign.jpg"]
                ).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="campaign"
                    className="w-full h-48 object-cover"
                  />
                ))}
              </Carousel>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                {camp.title}
              </h2>
              <p className="text-sm text-gray-500 mb-3">{camp.category}</p>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <p>
                  <span className="font-medium text-gray-600">Status:</span>{" "}
                  {camp.status}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Goal:</span> ₨{" "}
                  {camp.goalAmount.toLocaleString()}
                </p>
                <p>
                  <span className="font-medium text-gray-600">Raised:</span> ₨{" "}
                  {camp.raisedAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <Divider className="my-4" />

          {/* Donations */}
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FaDonate className="text-green-500" />
            Donations
          </h3>

          {donationsMap[camp._id]?.length === 0 ? (
            <p className="text-center text-sm text-gray-500 bg-gray-50 py-4 rounded-lg">
              No donations yet
            </p>
          ) : (
            <List
              dataSource={donationsMap[camp._id]}
              className="bg-gray-50 rounded-xl"
              renderItem={(don) => (
                <List.Item className="px-4 py-3">
                  <List.Item.Meta
                    avatar={
                      <Avatar className="bg-green-100 text-green-700">
                        {don.donor.firstName[0]}
                      </Avatar>
                    }
                    title={
                      <span className="font-medium text-gray-700">
                        {don.donor.firstName} {don.donor.lastName}
                      </span>
                    }
                    description={
                      <>
                        <span className="text-sm text-gray-500">
                          ₨ {don.amount.toLocaleString()} •{" "}
                          {new Date(don.donatedAt).toLocaleDateString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          {don.donor.phone}
                        </span>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Donations;
