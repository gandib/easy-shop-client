"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 px-6">
        {/* Logo and Description */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">Easy Shop</h2>
          <p className="text-gray-400 mt-2">
            Your go-to platform for premium products and services.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 text-center">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/all-products" className="hover:text-gray-400">
            Products
          </Link>
          <Link href="/viewed-products" className="hover:text-gray-400">
            Viewed Products
          </Link>
          <Link href="/cart" className="hover:text-gray-400">
            Cart
          </Link>
          {/* <Link href="/about-us" className="hover:text-gray-400">
            About Us
          </Link>
          <Link href="/contact-us" className="hover:text-gray-400">
            Contact Us
          </Link> */}
        </nav>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
            aria-label="GitHub"
          >
            <i className="fab fa-github"></i>
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-500">
        &copy; {new Date().getFullYear()} Easy Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
