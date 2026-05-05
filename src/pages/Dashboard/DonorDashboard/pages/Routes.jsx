import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import DonationHistory from "./DonationHistory";
import Header from "../components/Header";

const Index = () => {
  return (
    <main className="flex flex-col min-h-screen flex-1">
      <Header />
      <div className="flex-1 bg-gray-50 p-4 md:p-6 overflow-y-auto">
        <Routes>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="donation-history" element={<DonationHistory />} />
        </Routes>
      </div>
    </main>
  );
};

export default Index;
