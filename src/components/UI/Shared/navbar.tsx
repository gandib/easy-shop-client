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
import { ThemeSwitch } from "../theme-switch";
import { useUser } from "@/src/context/user.provider";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/src/services/AuthService";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import useDebounce from "@/src/hooks/debounce.hook";
import { TProductMeta } from "@/src/types";
import NavbarSearching from "./NavbarSearching";
import NavbarSearchForm from "./NavbarSearchForm";
import NavbarCategoryMegaMenu from "./NavbarCategoryMegaMenu";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading, isLoading } = useUser();
  const [productData, setProductData] = useState<TProductMeta>();
  const { register, handleSubmit, watch, setValue } = useForm();
  const searchText = useDebounce(watch("search"));
  const [loading, setLoading] = useState(true);

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
    <div className="mb-10">
      <NextUINavbar
        className="bg-primary-50 fixed xl:px-20"
        maxWidth="2xl"
        position="sticky"
      >
        <NavbarContent
          className="basis-1/5 sm:basis-full relative"
          justify="start"
        >
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Logo />
              <p className="font-bold text-base  text-inherit text-secondary-900">
                EasyShop
              </p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start items-center ml-2">
            {/* Brows Category Mega Menu  */}
            <NavbarItem>
              <NavbarCategoryMegaMenu />
            </NavbarItem>

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

        <NavbarSearchForm
          handleSubmit={handleSubmit}
          register={register}
          searchText={searchText}
          setLoading={setLoading}
          setProductData={setProductData}
        />

        <NavbarContent
          className="hidden md:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          {
            <NavbarItem className="hidden lg:flex gap-2">
              <Link
                className="text-primary-800 font-bold text-base"
                href="/user-dashboard/cart"
              >
                <ShoppingCart />
              </Link>
            </NavbarItem>
          }
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
                color={
                  pathname === "/viewed-products" ? "primary" : "foreground"
                }
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
                    pathname === "/user-dashboard/cart"
                      ? "primary"
                      : "foreground"
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

      {searchText && (productData?.data || loading) && (
        <NavbarSearching
          loading={loading}
          productData={productData!}
          setProductData={setProductData}
          setValue={setValue}
        />
      )}
    </div>
  );
};
