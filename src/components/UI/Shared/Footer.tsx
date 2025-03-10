"use client";

import { useUser } from "@/src/context/user.provider";
import { Facebook, Github, Linkedin, X } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto grid gap-8 md:grid-cols-3 lg:flex lg:justify-between items-center space-y-6 md:space-y-0 px-6">
        {/* Logo and Description */}
        <div className="text-center md:text-left">
          <Link
            href={"/"}
            className="text-3xl font-extrabold text-secondary-400 mb-2"
          >
            Easy Shop
          </Link>
          <p className="text-gray-400 text-lg mt-2">
            Your go-to platform for premium products and services. Shop now and
            enjoy exclusive offers.
          </p>

          {/* Contact Info */}
          <div className="mt-6 text-gray-400">
            <p className="text-sm">📞 Phone: +88 01755109039</p>
            <p className="text-sm">📧 Email: gandibdhariroy@gmail.com</p>
            <p className="text-sm">
              🏠 Address: 1234 Shopping St, Sunamganj, Bangladesh
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="grid gap-4 text-center md:text-left">
          <Link href="/" className="hover:text-secondary-400 transition-colors">
            Home
          </Link>
          <Link
            href="/all-products"
            className="hover:text-secondary-400 transition-colors"
          >
            Products
          </Link>
          <Link
            href="/viewed-products"
            className="hover:text-secondary-400 transition-colors"
          >
            Viewed Products
          </Link>
          <Link
            href="/user-dashboard/cart"
            className="hover:text-secondary-400 transition-colors"
          >
            Cart
          </Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 gap-4 text-2xl">
          <a
            href="https://facebook.com/gandib-gyanangkur"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary-400 transition-colors"
            aria-label="Facebook"
          >
            <Facebook />
          </a>
          <a
            href="https://x.com/gandibroy11"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary-400 transition-colors"
            aria-label="Twitter"
          >
            <X />
          </a>
          <a
            href="https://linkedin.com/in/gandib"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin />
          </a>
          <a
            href="https://github.com/gandib"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary-400 transition-colors"
            aria-label="GitHub"
          >
            <Github />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Easy Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
