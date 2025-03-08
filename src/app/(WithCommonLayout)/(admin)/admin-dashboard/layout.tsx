import AdminSidebar from "@/src/components/UI/AdminSidebar";
import { adminLinks } from "@/src/components/UI/AdminSidebar/constant";
import SidebarMenu from "@/src/components/UI/SidebarMenu";
import React from "react";
import { DashboardNavbar } from "@/src/components/UI/Dashboard/DashboardNavbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex-grow min-h-screen">
      <DashboardNavbar />
      <div className="md:hidden">
        <SidebarMenu links={adminLinks} />
      </div>
      <div className="flex w-full gap-3 justify-center">
        <div className="md:w-2/6 lg:w-1/6 min-h-full bg-gray-600">
          <div className="hidden md:flex">
            <AdminSidebar />
          </div>
        </div>
        <div className="w-11/12 md:w-4/6 lg:w-5/6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
