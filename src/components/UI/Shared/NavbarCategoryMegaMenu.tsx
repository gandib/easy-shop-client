"use client";

import { ChevronDown } from "lucide-react";
import NextLink from "next/link";
import { useState } from "react";

const NavbarCategoryMegaMenu = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  return (
    <div
      className={`relative text-base font-bold cursor-pointer `}
      onMouseEnter={() => setShowMegaMenu(true)}
      onMouseLeave={() => setShowMegaMenu(false)}
    >
      <h1 className="text-base font-bold flex">
        Brows Categories <ChevronDown className="pt-1" />
      </h1>

      {/* Mega Menu */}
      {showMegaMenu && (
        <div className="absolute left-0 top-full pt-2 w-[300px] bg-default-100 shadow-lg rounded-md p-4 z-50">
          <div className="grid grid-cols-2 gap-4">
            {/* Individual Links */}

            <NextLink href="/all-products?category=Smarts Phone" legacyBehavior>
              <a
                className={`font-medium cursor-pointer  hover:text-primary-500`}
              >
                Smarts Phone
              </a>
            </NextLink>
            <NextLink href="/all-products?category=Motor Cycle" legacyBehavior>
              <a className="font-medium cursor-pointer hover:text-primary-500">
                Motor Cycle
              </a>
            </NextLink>
            <NextLink href="/all-products?category=Electronics" legacyBehavior>
              <a className="font-medium cursor-pointer hover:text-primary-500">
                Electronics
              </a>
            </NextLink>
            <NextLink href="/all-products?category=Charger" legacyBehavior>
              <a className="font-medium cursor-pointer hover:text-primary-500">
                Charger
              </a>
            </NextLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarCategoryMegaMenu;
