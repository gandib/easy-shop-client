"use client";

import { Button } from "@nextui-org/react";
import hero from "@/src/assets/shop.jpg";
import Link from "next/link";

const Hero = () => {
  return (
    <div
      className="h-[60vh] relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${hero.src})`,
        backgroundAttachment: "fixed", // Keeps the background fixed
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 flex items-center justify-center h-full text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-white">
            Shop for the Best Price
          </h1>
          <p className="mb-5 text-white">
            Find the best deals and shop at unbeatable prices.
          </p>
          <Link
            href={"/login"}
            className="btn btn-primary px-6 py-3 rounded hover:bg-primary-700 bg-primary-500 text-white"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
