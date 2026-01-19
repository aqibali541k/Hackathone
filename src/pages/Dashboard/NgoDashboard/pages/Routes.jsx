import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import Header from "../components/Header";
import CampaignForm from "./Campaigns/CampaignForm";
import ManageCampaigns from "./Campaigns/ManageCampaigns";
import Donations from "./Campaigns/Donations";
import Analytics from "./Analytics";

const Index = () => {
  return (
    <main className="flex flex-col min-h-screen flex-1">
      <Header />

      <div className="flex-1 bg-gray-50 p-4 md:p-6 overflow-y-auto">
        <Routes>
          <Route index element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="campaigns-form" element={<CampaignForm />} />
          <Route path="manage-campaigns" element={<ManageCampaigns />} />
          <Route path="donations" element={<Donations />} />
        </Routes>
      </div>
    </main>
  );
};

export default Index;
