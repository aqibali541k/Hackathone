import React from "react";
import { Heart, HandHeart, Users } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-amber-50 via-orange-100 to-amber-50 py-20 px-6 font-serif overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1602524204632-9c3b77e9b4b2?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-amber-50/80 to-orange-50/90"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-6 drop-shadow-sm">
          About <span className="text-orange-600">Donation Hub</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-10">
          We are a passionate non-profit organization dedicated to uplifting
          communities through collective generosity. Our mission is to connect
          kind-hearted donors with meaningful causes — supporting education,
          healthcare, and basic needs for those who need it most.
        </p>

        {/* Icons Section */}
        <div className="flex justify-center gap-10 mt-10 flex-wrap">
          <div className="flex flex-col items-center text-amber-800">
            <Heart size={40} />
            <p className="mt-2 font-medium">Spread Love</p>
          </div>
          <div className="flex flex-col items-center text-orange-700">
            <HandHeart size={40} />
            <p className="mt-2 font-medium">Support Humanity</p>
          </div>
          <div className="flex flex-col items-center text-amber-900">
            <Users size={40} />
            <p className="mt-2 font-medium">Build Community</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
