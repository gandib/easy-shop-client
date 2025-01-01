"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import { Logo } from "@/src/components/icons";
import { ThemeSwitch } from "./theme-switch";
import { useUser } from "@/src/context/user.provider";
import { useRouter } from "next/navigation";
import { logout } from "@/src/services/AuthService";

import { ShoppingCart } from "lucide-react";
import DashboardNavbarDropDown from "./DashboardNavbarDropDown";

export const DashboardNavbar = () => {
  const router = useRouter();
  const { user, setIsLoading, isLoading } = useUser();

  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res.success) {
        router.push("/");
      } else {
        console.error("Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <NextUINavbar className="bg-primary-50" maxWidth="2xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-base  text-inherit text-secondary-900">
              EasyShop
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start items-center ml-2">
          {/* <NavbarItem>
            <NextLink
              className={`text-lg ${pathname === "/shop" ? "text-primary-500" : ""}`}
              href="/shop"
            >
              Shop
            </NextLink>
          </NavbarItem> */}
        </ul>
      </NavbarContent>

      <NavbarContent className=" basis-1/5 sm:basis-full" justify="end">
        {user && user?.role === "USER" && (
          <NavbarItem className=" gap-2">
            <Link
              className="text-primary-800 font-bold text-base"
              href="/user-dashboard/cart"
            >
              <ShoppingCart />
            </Link>
          </NavbarItem>
        )}
        <NavbarItem className=" gap-2">
          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className=" gap-2">
          <DashboardNavbarDropDown />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
