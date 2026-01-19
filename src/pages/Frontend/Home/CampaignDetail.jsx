// src/pages/public/CampaignDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Progress, Spin, Button, Input, message, Carousel } from "antd";
import { motion } from "framer-motion";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";

/* ================= CLOUDINARY IMAGE OPTIMIZER ================= */
const optimizeImage = (url) =>
  url
    ? url.replace("/upload/", "/upload/w_1400,q_auto,f_auto/")
    : "https://via.placeholder.com/1400x700?text=No+Image";

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donating, setDonating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
  });

  /* ================= FETCH CAMPAIGN ================= */
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

  /* ================= DONATE ================= */
  const handleDonate = async () => {
    const { name, email, amount } = form;

    if (!name || !email || !amount) {
      return message.error("Please fill all fields");
    }

    if (!token) {
      return message.error("Please login to donate");
    }

    setDonating(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/donations/create`,
        {
          campaignId: id,
          amount: Number(amount),
          donorName: name,
          donorEmail: email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      message.success("Thank you for your donation!");
      setForm({ name: "", email: "", amount: "" });
      fetchCampaign();
    } catch {
      message.error("Donation failed");
    } finally {
      setDonating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-32">
        <Spin size="large" />
      </div>
    );
  }
  if (!campaign) {
    return <p className="text-center mt-32">Campaign not found</p>;
  }
  const progress = Math.min(
    (campaign.raisedAmount / campaign.goalAmount) * 100,
    100,
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B3D2E] to-[#134E3A] py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 6.6 }}
        >
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <Carousel autoplay>
              {(campaign.images?.length
                ? campaign.images
                : ["https://via.placeholder.com/1400x700"]
              ).map((img, index) => (
                <div
                  key={index}
                  className="h-[260px] sm:h-[320px] md:h-[400px] lg:h-[480px]"
                >
                  <img
                    src={optimizeImage(img)}
                    alt={`campaign-${index}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </Carousel>
          </div>

          {/* 🔙 BACK BUTTON */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 flex justify-center"
          >
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => {
                navigate("/");
                setTimeout(() => {
                  document
                    .getElementById("campaigns")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 300);
              }}
              className="!bg-transparent !border !border-yellow-400 !text-yellow-400 hover:!bg-yellow-400 hover:!text-black !px-6 sm:!px-10 !py-3 sm:!py-4 !text-sm sm:!text-base !rounded-full !font-semibold !transition-all"
            >
              Back to Campaigns
            </Button>
          </motion.div>
        </motion.div>

        {/* ================= RIGHT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            LET’S CREATE <br />
            <span className="text-yellow-400">{campaign.title}</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-gray-200 text-sm sm:text-base md:text-lg max-w-xl">
            {campaign.description}
          </p>

          {/* Progress */}
          <div className="mt-8 sm:mt-10 max-w-xl">
            <Progress
              percent={progress}
              strokeColor="#F97316"
              trailColor="#1F2937"
              showInfo={false}
            />
            <div className="flex justify-between text-xs sm:text-sm mt-2">
              <span className="text-green-400 font-semibold">
                Goal: ₨ {campaign.goalAmount.toLocaleString()}
              </span>
              <span className="text-orange-400 font-semibold">
                Raised: ₨ {campaign.raisedAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* ================= DONATION FORM ================= */}
          <div className="mt-10 sm:mt-14 max-w-xl space-y-4 sm:space-y-5">
            <h3 className="text-xl sm:text-2xl font-semibold">
              Make a Donation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                size="large"
              />

              <Input
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                size="large"
              />
            </div>

            <Input
              type="number"
              placeholder="Donation Amount (PKR)"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              size="large"
            />

            <Button
              size="large"
              loading={donating}
              onClick={handleDonate}
              className="!bg-orange-500 !border-none !text-white !w-full
                         mt-5! !py-4 sm:!py-6
                         !text-sm sm:!text-base !font-semibold
                         hover:!bg-orange-600"
            >
              Donate Now
            </Button>

            <p className="text-xs text-gray-300 text-center sm:text-left">
              Secure payment • No hidden charges
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CampaignDetail;
