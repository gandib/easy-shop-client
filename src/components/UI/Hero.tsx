"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const Hero = () => {
  const slides = [
    {
      src: "/assets/shop.jpg",
      title: "Shop for the Best Price",
      description: "Find the best deals and shop at unbeatable prices.",
    },
    {
      src: "/assets/product.jpg",
      title: "Exclusive Discounts",
      description: "Unbeatable prices for your favorite products.",
    },
    {
      src: "/assets/product2.jpg",
      title: "New Arrivals",
      description: "Discover the latest trends today.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url(${slide.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-neutral-content">
            <h1 className="text-5xl font-bold text-white">{slide.title}</h1>
            <p className="text-white mb-5">{slide.description}</p>
            <Link
              href="/all-products"
              className="btn btn-primary px-6 py-3 rounded hover:bg-primary-700 bg-primary-500 text-white"
            >
              Shop Now
            </Link>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 z-30"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-3 hover:bg-gray-700 z-30"
      >
        ❯
      </button>

      <div className="absolute bottom-5 w-full flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
