// src/pages/public/CampaignsSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row, Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { FaDonate } from "react-icons/fa";

const CampaignsSection = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch campaigns
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/campaigns/readall`,
        );
        setCampaigns(res.data);
        setFilteredCampaigns(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCampaigns();
  }, []);

  // Search filter
  useEffect(() => {
    const filtered = campaigns.filter((c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCampaigns(filtered);
  }, [searchTerm, campaigns]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-14 px-4 font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-8 text-center text-amber-800">
          Active Campaigns
        </h2>

        {/* Search */}
        <div className="flex justify-center mb-10">
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="!rounded-full !px-4 !py-2.5 !w-full sm:!w-2/3 md:!w-1/2 !border-amber-400"
          />
        </div>

        {/* Cards */}
        <Row gutter={[20, 20]}>
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((c) => (
              <Col key={c._id} xs={24} sm={12} md={8} lg={6} className="flex">
                <Card
                  hoverable
                  onClick={() => navigate(`/campaigns/${c._id}`)}
                  className="
                    cursor-pointer
                    group flex flex-col h-full w-full
                    rounded-2xl overflow-hidden
                    bg-gradient-to-br from-amber-100 to-orange-50
                    border border-amber-200
                    shadow-sm
                    transition-all duration-300 ease-in-out
                    hover:-translate-y-2 hover:shadow-xl
                  "
                  cover={
                    <div className="relative overflow-hidden">
                      <img
                        src={c?.images?.[0]}
                        alt={c.title}
                        className="
                          h-44 w-full object-cover
                          transition-transform duration-500
                          group-hover:scale-105
                        "
                      />

                      {/* Status */}
                      <span
                        className={`absolute top-2 right-2 px-2 py-0.5 text-[10px] font-semibold rounded-full
                          ${
                            c.status === "active"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                      >
                        {c.status === "active" ? "Active" : "Closed"}
                      </span>
                    </div>
                  }
                >
                  {/* Content */}
                  <div className="p-3 flex flex-col flex-1">
                    <div className="flex-1 space-y-1.5">
                      <h3 className="text-sm font-semibold text-amber-900 truncate">
                        {c.title}
                      </h3>

                      <p className="text-gray-700 text-xs line-clamp-1">
                        {c.description}
                      </p>

                      <div className="flex justify-between items-center pt-2 text-[11px]">
                        <span className="font-medium text-amber-800">
                          Goal:
                          <span className="text-green-700 ml-1">
                            ₨ {c.goalAmount.toLocaleString()}
                          </span>
                        </span>

                        <span className="font-medium text-amber-800">
                          Raised:
                          <span className="text-blue-700 ml-1">
                            ₨ {c.raisedAmount.toLocaleString()}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Button (stop bubbling so card click bhi kaam kare) */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/campaigns/${c._id}`);
                      }}
                      className="
                        mt-3 w-full
                        bg-red-600! text-white!
                        hover:bg-white! hover:text-red-600!
                        border-red-600!
                        !text-xs !py-2.5
                        shadow-sm hover:shadow-md
                        transition-all duration-300
                        hover:scale-[1.02]
                      "
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <FaDonate className="text-xs" />
                        Donate
                      </span>
                    </Button>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center text-amber-800 w-full">
              No campaigns found.
            </p>
          )}
        </Row>
      </div>
    </div>
  );
};

export default CampaignsSection;
