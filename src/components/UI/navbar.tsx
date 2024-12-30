"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import { siteConfig } from "@/src/config/site";
import { Logo } from "@/src/components/icons";
import NavbarDropDown from "./navbarDropDown";
import { ThemeSwitch } from "./theme-switch";
import { useUser } from "@/src/context/user.provider";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/src/services/AuthService";
import { protectedRoutes } from "@/src/utils/constant";
import { useState } from "react";
import { ChevronDown, ShoppingCart } from "lucide-react";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading } = useUser();
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  // const handleLogout = () => {
  //   // logout();
  //   document.cookie =
  //     "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; secure;";
  //   setIsLoading(true);
  //   router.push("/");

  //   if (protectedRoutes.some((route) => pathname.match(route))) {
  //     router.push("/");
  //   }
  // };

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
          <NavbarItem>
            <div
              className={`relative text-base font-bold cursor-pointer `}
              onMouseEnter={() => setShowMegaMenu(true)}
              onMouseLeave={() => setShowMegaMenu(false)}
            >
              {/* Single Link */}
              {/* <NextLink href="/all-products" legacyBehavior>
                <a className="text-base font-bold flex">
                  Products
                  <ChevronDown className="pt-1" />{" "}
                </a>
              </NextLink> */}
              <h1 className="text-base font-bold flex">
                Brows Categories <ChevronDown className="pt-1" />
              </h1>

              {/* Mega Menu */}
              {showMegaMenu && (
                <div className="absolute left-0 top-full pt-2 w-[300px] bg-white shadow-lg rounded-md p-4 z-50">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Individual Links */}

                    <NextLink
                      href="/all-products?category=Smarts Phone"
                      legacyBehavior
                    >
                      <a
                        className={`font-medium cursor-pointer  hover:text-primary-500`}
                      >
                        Smarts Phone
                      </a>
                    </NextLink>
                    <NextLink
                      href="/all-products?category=Motor Cycle"
                      legacyBehavior
                    >
                      <a className="font-medium cursor-pointer hover:text-primary-500">
                        Motor Cycle
                      </a>
                    </NextLink>
                    <NextLink
                      href="/all-products?category=Electronics"
                      legacyBehavior
                    >
                      <a className="font-medium cursor-pointer hover:text-primary-500">
                        Electronics
                      </a>
                    </NextLink>
                    <NextLink
                      href="/all-products?category=Charger"
                      legacyBehavior
                    >
                      <a className="font-medium cursor-pointer hover:text-primary-500">
                        Charger
                      </a>
                    </NextLink>
                  </div>
                </div>
              )}
            </div>
          </NavbarItem>

          {/* <NavbarItem>
            <NextLink
              className={`text-lg ${pathname === "/shop" ? "text-primary-500" : ""}`}
              href="/shop"
            >
              Shop
            </NextLink>
          </NavbarItem> */}

          {user?.email && (
            <>
              {/* <NavbarItem>
                <NextLink
                  href={
                    user?.role === "USER"
                      ? "/user-dashboard"
                      : user?.role === "ADMIN"
                        ? "/admin-dashboard"
                        : "/vendor-dashboard"
                  }
                  className={`text-base font-bold ${pathname === "/user-dashboard" ? "text-primary-500" : ""} ${pathname === "/admin-dashboard" ? "text-primary-500" : ""} ${pathname === "/vendor-dashboard" ? "text-primary-500" : ""}`}
                >
                  Dashboard
                </NextLink>
              </NavbarItem> */}
            </>
          )}
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={pathname === item.href ? "primary" : "foreground"}
                href={item.href}
                size="md"
                className="font-bold"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden md:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {user && user?.email && (
          <NavbarItem className="hidden lg:flex gap-2">
            <Link
              className="text-primary-800 font-bold text-base"
              href="/user-dashboard/cart"
            >
              <ShoppingCart />
            </Link>
          </NavbarItem>
        )}
        <NavbarItem className="hidden lg:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {user && user.email ? (
          <NavbarItem className="hidden lg:flex gap-2">
            <NavbarDropDown />
          </NavbarItem>
        ) : (
          <NavbarItem className="hidden sm:flex gap-2">
            <Link
              className="text-primary-800 text-base font-bold"
              href="/login"
            >
              Login
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        {user && user?.email && (
          <NavbarItem className="hidden xs:flex gap-2">
            <Link
              className="text-primary-800 font-bold text-base"
              href="/user-dashboard/cart"
            >
              <ShoppingCart />
            </Link>
          </NavbarItem>
        )}
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {/* <NavbarItem>
            <NextLink
              className={`text-lg ${pathname === "/viewed-products" ? "text-primary-500" : ""}`}
              href="/viewed-products"
            >
              Viewed Products
            </NextLink>
          </NavbarItem> */}
          {/* <NavbarItem>
            <NextLink
              className={`text-lg ${pathname === "/shop" ? "text-primary-500" : ""}`}
              href="/shop"
            >
              Shop
            </NextLink>
          </NavbarItem> */}
          {user?.email && (
            <>
              <NavbarItem>
                <NextLink
                  href={
                    user?.role === "USER"
                      ? "/user-dashboard"
                      : user?.role === "ADMIN"
                        ? "/admin-dashboard"
                        : "/vendor-dashboard"
                  }
                  className={`text-lg ${pathname === "/user-dashboard" ? "text-primary-500" : ""} ${pathname === "/admin-dashboard" ? "text-primary-500" : ""} ${pathname === "/vendor-dashboard" ? "text-primary-500" : ""}`}
                >
                  Dashboard
                </NextLink>
              </NavbarItem>
            </>
          )}
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={pathname === item.href ? "primary" : "foreground"}
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarItem className="hidden xs:flex gap-2">
            <Link
              color={pathname === "/viewed-products" ? "primary" : "foreground"}
              href="/viewed-products"
              className="text-lg"
            >
              Viewed Products
            </Link>
          </NavbarItem>
          {user && user?.email && (
            <NavbarItem className="hidden xs:flex gap-2">
              <Link
                color={
                  pathname === "/user-dashboard/cart" ? "primary" : "foreground"
                }
                href="/user-dashboard/cart"
                className="text-lg"
              >
                Cart
              </Link>
            </NavbarItem>
          )}

          {user && user.email ? (
            <p
              onClick={handleLogout}
              className="font-bold cursor-pointer bg-default-200 hover:bg-red-500 w-fit py-2 px-4 rounded-md"
            >
              Logout
            </p>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
