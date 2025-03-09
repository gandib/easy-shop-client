"use client";
import { useUser } from "@/src/context/user.provider";
import { protectedRoutes } from "@/src/utils/constant";
import { Avatar } from "@nextui-org/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

const NavbarDropDown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading } = useUser();

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
        <DropdownItem onPress={navigateDashboard} key="dashboard" className="">
          Dashboard
        </DropdownItem>
        <DropdownItem onPress={navigateProfile} key="profile" className="">
          My Profile
        </DropdownItem>
        <DropdownItem
          onPress={navigateViewedProducts}
          key="Viewed-Products"
          className=""
        >
          Viewed Products
        </DropdownItem>
        <DropdownItem
          onPress={handleLogout}
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
