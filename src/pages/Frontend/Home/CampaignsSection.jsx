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

  // Filter campaigns whenever search term changes
  useEffect(() => {
    const filtered = campaigns.filter((c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCampaigns(filtered);
  }, [searchTerm, campaigns]);

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500">
      {/* Search Bar */}

      {/* Campaigns Grid */}
      <h2 className="text-3xl font-bold mb-8 text-white text-center">
        All Campaigns
      </h2>
      <div className="flex justify-center mb-6">
        <Input
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="!rounded-xl !px-3 !py-2 !w-62 md:w-1/3"
        />
      </div>
      <Row gutter={[24, 24]}>
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((c) => (
            <Col xs={24} sm={12} md={8} key={c._id}>
              <Card
                hoverable
                className="rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 duration-300 border border-gray-200"
              >
                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-bold text-gray-800 truncate">
                    {c.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {c.description}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-700 font-semibold">
                      Goal:{" "}
                      <span className="text-green-600">
                        ₨ {c.goalAmount.toLocaleString()}
                      </span>
                    </p>
                    <p className="text-gray-700 font-semibold">
                      Raised:{" "}
                      <span className="text-blue-600">
                        ₨ {c.raisedAmount.toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <Link to={`/campaigns/${c._id}`}>
                    <Button className="w-full flex justify-center items-center gap-2 mt-3 !bg-gradient-to-r !from-indigo-500 !to-purple-500 !border-none hover:!from-indigo-600 hover:!to-purple-600">
                      <FaDonate /> View & Donate
                    </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-white text-center w-full">No campaigns found.</p>
        )}
      </Row>
    </div>
  );
};

export default CampaignsSection;
