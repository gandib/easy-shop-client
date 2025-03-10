"use client";

import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";

const HomeBanner = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center w-full pt-8">
      <div
        className="relative w-full h-[300px] flex items-center justify-center text-white rounded-lg overflow-hidden"
        style={{
          background: `url('https://images.unsplash.com/photo-1593642634367-d91a135587b5')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg">
            Exclusive <span className="text-yellow-400">Mega Sale!</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl font-medium">
            Discover amazing deals on smartphones, bikes, watches, and more!
          </p>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => router.push("/flash-sale")}
              className="px-6 py-3 bg-secondary-400 text-white font-semibold rounded-lg shadow-md hover:bg-secondary-500 transition-all flex items-center"
            >
              <Zap className="h-5 w-5 mr-2" />
              Explore Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
