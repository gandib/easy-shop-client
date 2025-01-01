import { DashboardNavbar } from "@/src/components/UI/DashboardNavbar";
import SidebarMenu from "@/src/components/UI/SidebarMenu";
import VendorSidebar from "@/src/components/UI/VendorSidebar";
import { vendorLinks } from "@/src/components/UI/VendorSidebar/constant";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto  px-6 flex-grow min-h-screen">
      <DashboardNavbar />
      <div className="md:hidden">
        <SidebarMenu links={vendorLinks} />
      </div>
      <div className="my-3 flex w-full gap-6 justify-center">
        <div className="md:w-2/6 hidden md:flex min-h-full bg-default-100">
          <VendorSidebar />
        </div>
        <div className="w-11/12 md:5/6">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
