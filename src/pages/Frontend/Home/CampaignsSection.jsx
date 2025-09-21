// src/pages/public/CampaignsSection.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Col, Row, Button, Input, Select } from "antd";
import { Link } from "react-router-dom";
import { FaDonate } from "react-icons/fa";

const { Option } = Select;

const CampaignsSection = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

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

  // Filter campaigns whenever search term or category changes
  useEffect(() => {
    let filtered = campaigns;

    if (searchTerm) {
      filtered = filtered.filter((c) =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter((c) => c.category === categoryFilter);
    }

    setFilteredCampaigns(filtered);
  }, [searchTerm, categoryFilter, campaigns]);

  const categories = ["health", "education", "disaster", "others"];

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <Input
          placeholder="Search campaigns..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="!rounded-xl !px-4 !py-3 w-full md:w-1/2"
        />
        <Select
          placeholder="Filter by category"
          value={categoryFilter}
          onChange={(value) => setCategoryFilter(value)}
          allowClear
          className="!rounded-xl w-full md:w-1/4"
        >
          {categories.map((cat) => (
            <Option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Option>
          ))}
        </Select>
      </div>

      {/* Campaigns Grid */}
      <h2 className="text-3xl font-bold mb-8 text-white text-center">
        All Campaigns
      </h2>
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
                    <Button className="w-full flex justify-center items-center gap-2 mt-3 bg-gradient-to-r from-indigo-500 to-purple-500 border-none hover:from-indigo-600 hover:to-purple-600">
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
