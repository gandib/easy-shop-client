"use client";
import { useUser } from "@/src/context/user.provider";
import { logout } from "../../../services/AuthService";
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

const DashboardNavbarDropDown = () => {
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

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          onPress={navigateProfile} // Switch to onClick for testing
          key="profile"
          className=""
        >
          My Profile
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

export default DashboardNavbarDropDown;
