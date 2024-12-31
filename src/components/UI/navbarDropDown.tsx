"use client";
import { useUser } from "@/src/context/user.provider";
import { logout } from "../../../src/services/AuthService";
import { protectedRoutes } from "@/src/utils/constant";
import { Avatar } from "@nextui-org/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const NavbarDropDown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading } = useUser();

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  const handleLogout = () => {
    // logout();
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; secure;";
    setIsLoading(true);
    router.push("/");

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  {
    user?.email && (
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
    );
  }

  const navigateDashboard = () => {
    router.push(
      `${
        user?.role === "USER"
          ? "/user-dashboard"
          : user?.role === "ADMIN"
            ? "/admin-dashboard"
            : "/vendor-dashboard"
      }`
    );
  };

  const navigateProfile = () => {
    router.push(
      `${
        user?.role === "USER"
          ? "/user-dashboard/profile"
          : user?.role === "ADMIN"
            ? "/admin-dashboard/profile"
            : "/vendor-dashboard/profile"
      }`
    );
  };

  const navigateViewedProducts = () => {
    router.push(`/viewed-products`);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          onPress={navigateDashboard} // Switch to onClick for testing
          key="dashboard"
          className=""
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          onPress={navigateProfile} // Switch to onClick for testing
          key="profile"
          className=""
        >
          Profile
        </DropdownItem>
        <DropdownItem
          onPress={navigateViewedProducts} // Switch to onClick for testing
          key="Viewed-Products"
          className=""
        >
          Viewed Products
        </DropdownItem>
        <DropdownItem
          onPress={handleLogout} // Switch to onClick for testing
          key="delete"
          className="text-danger"
          color="danger"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropDown;
