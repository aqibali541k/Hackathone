// src/pages/public/CampaignsSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row, Button, Input } from "antd";
import { Link } from "react-router-dom";
import { FaDonate } from "react-icons/fa";

const CampaignsSection = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch campaigns from backend
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:8000/campaigns/readall");
        setCampaigns(res.data);
        setFilteredCampaigns(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCampaigns();
  }, []);

  // Filter campaigns by search term
  useEffect(() => {
    const filtered = campaigns.filter((c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCampaigns(filtered);
  }, [searchTerm, campaigns]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-16 px-6 font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl font-bold mb-10 text-center text-amber-800 drop-shadow-sm">
          Our Active Campaigns
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="!rounded-full !px-4 !py-3 !w-full md:!w-1/2 !border-amber-400 focus:!border-amber-600 focus:!shadow-lg"
          />
        </div>

        {/* Campaign Cards */}
        <Row gutter={[24, 24]}>
          {filteredCampaigns.length > 0 ? (
            filteredCampaigns.map((c) => (
              <Col xs={24} sm={12} md={8} key={c._id}>
                <Card
                  hoverable
                  className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-200 bg-gradient-to-br from-amber-100 to-orange-50"
                  cover={
                    <img
                      alt={c.title}
                      src={
                        c.imageUrl ||
                        "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80"
                      }
                      className="h-48 w-full object-cover"
                    />
                  }
                >
                  <div className="p-2 space-y-2">
                    <h3 className="text-xl font-semibold text-amber-900 truncate">
                      {c.title}
                    </h3>
                    <p className="text-gray-700 text-sm line-clamp-3">
                      {c.description}
                    </p>

                    <div className="flex justify-between items-center mt-3 text-sm">
                      <p className="text-amber-800 font-semibold">
                        Goal:{" "}
                        <span className="text-green-700">
                          ₨ {c.goalAmount.toLocaleString()}
                        </span>
                      </p>
                      <p className="text-amber-800 font-semibold">
                        Raised:{" "}
                        <span className="text-blue-700">
                          ₨ {c.raisedAmount.toLocaleString()}
                        </span>
                      </p>
                    </div>

                    <Link to={`/campaigns/${c._id}`}>
                      <Button className="w-full flex justify-center items-center gap-2 mt-4 !bg-gradient-to-r !from-amber-500 !to-orange-600 !border-none !text-white hover:!from-orange-500 hover:!to-amber-500 !font-semibold !rounded-full !py-5 !shadow-md hover:!shadow-xl transition-all">
                        <FaDonate /> View & Donate
                      </Button>
                    </Link>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center text-amber-800 text-lg w-full">
              No campaigns found.
            </p>
          )}
        </Row>
      </div>
    </div>
  );
};

export default CampaignsSection;
