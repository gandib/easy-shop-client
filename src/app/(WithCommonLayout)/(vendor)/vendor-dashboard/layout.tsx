import { DashboardNavbar } from "@/src/components/UI/DashboardNavbar";
import SidebarMenu from "@/src/components/UI/SidebarMenu";
import VendorSidebar from "@/src/components/UI/VendorSidebar";
import { vendorLinks } from "@/src/components/UI/VendorSidebar/constant";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex-grow min-h-screen">
      <DashboardNavbar />
      <div className="md:hidden">
        <SidebarMenu links={vendorLinks} />
      </div>
      <div className="flex w-full gap-6 justify-center">
        <div className="w-1/12 md:w-2/6 lg:w-1/6 hidden md:flex min-h-full bg-gray-600">
          <VendorSidebar />
        </div>
        <div className="w-11/12 md:4/6 lg:w-5/6">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
