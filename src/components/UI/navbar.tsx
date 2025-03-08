"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Input,
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
import { useEffect, useState } from "react";
import { ChevronDown, Eye, SearchIcon, ShoppingCart } from "lucide-react";
import { FieldValues, useForm } from "react-hook-form";
import { queryParams } from "./OrderHistoryCard";
import { getAllProducts } from "@/src/services/ProductService";
import useDebounce from "@/src/hooks/debounce.hook";
import { IProduct } from "@/src/types";
import Image from "next/image";

type TProductMeta = {
  meta: { page: number; limit: number; total: number; totalPage: number };
  data: IProduct[];
};

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading, isLoading } = useUser();
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  const [productData, setProductData] = useState<TProductMeta>();
  const { register, handleSubmit, watch, setValue } = useForm();
  const searchText = useDebounce(watch("search"));
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const query: queryParams[] = [];
    query.push({ name: "limit", value: 10 });
    query.push({ name: "searchTerm", value: searchText });

    const fetchData = async () => {
      const { data: allProducts } = await getAllProducts(query);
      setProductData(allProducts);
      setLoading(false);
    };

    if (searchText) {
      setLoading(true);
      fetchData();
    } else {
      setProductData(undefined); // Clear the product data when search text is cleared
    }
  }, [searchText]);

  const onSubmit = (data: FieldValues) => {};

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
                  <div className="absolute left-0 top-full pt-2 w-[300px] bg-default-100 shadow-lg rounded-md p-4 z-50">
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

        <div className="flex justify-center items-center my-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("search")}
              aria-label="Search"
              placeholder="Search Product..."
              size="lg"
              startContent={
                <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
              }
              type="text"
            />
          </form>
        </div>

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
        <div
          className="bg-default-100 absolute flex flex-col w-full max-w-md h-[200px] overflow-y-auto p-2 z-50" // Added z-index
          style={{
            top: "4rem", // Adjust based on your layout
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {loading && <p className="flex justify-center">Searching...</p>}
          {productData?.data?.length! > 0
            ? productData?.data.map((product: IProduct) => (
                <div
                  onClick={() => {
                    router.push(`/shop/detail-product/${product.id}`);
                    setProductData(undefined);
                    setValue("search", "");
                  }}
                  key={product.id}
                  className="flex hover:bg-primary-100 cursor-pointer items-center justify-between py-2 border-b bg-default-100"
                >
                  <Image
                    src={product.img[0]}
                    width={50}
                    height={50}
                    alt="product"
                  />
                  <p className="text-default-800 font-semibold">
                    {product.name}
                  </p>
                  <Eye className="text-default-100 hover:text-primary-500" />
                  <span className="text-secondary-500 font-bold">{`$${product.price}`}</span>
                </div>
              ))
            : !loading && (
                <p className="text-center text-gray-500">No products found</p>
              )}
        </div>
      )}
    </div>
  );
};
