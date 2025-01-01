import SidebarMenu from "@/src/components/UI/SidebarMenu";
import UserSidebar from "@/src/components/UI/UserSidebar";
import { userLinks } from "@/src/components/UI/UserSidebar/constant";
import React from "react";
import { DashboardNavbar } from "@/src/components/UI/DashboardNavbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto w-full  px-6 flex-grow min-h-screen">
      <DashboardNavbar />
      <div className="md:hidden">
        <SidebarMenu links={userLinks} />
      </div>
      <div className="my-3 flex w-full gap-6 justify-center">
        <div className="md:w-2/6 hidden md:flex min-h-full bg-default-100">
          <UserSidebar />
        </div>
        <div className="w-11/12 md:5/6">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
