import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CampaignDetail from "./Home/CampaignDetail";
// import Donate from "./Donate";

const Frontend = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaigns/:id" element={<CampaignDetail />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default Frontend;
  