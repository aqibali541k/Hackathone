import React from "react";
import { Button } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import CampaignsSection from "./CampaignsSection";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    return <CampaignsSection />;
  };
    return (
      <section className="relative w-full h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_photo-1683140538884-07fb31428ca6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRvbmF0aW9uJTIwaHVifGVufDB8fDB8fHww')",
          }}
        ></div>

        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Support Our Cause
          </h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-md">
            Join us in making a difference. Donate to support our ongoing campaigns.
          </p>
          {/* <Button
            type="primary"
            size="large"
            onClick={handleDonateClick}
            className="!bg-gradient-to-r !from-yellow-400 !to-orange-500 !hover:from-yellow-500 !hover:to-orange-600 !text-black !font-bold !px-8 !py-4 !rounded-full !shadow-xl !transition-all !duration-300"
          >
            Donate Now
          </Button> */}
        </div>
      </section>
    );
  };

  export default HeroSection;
