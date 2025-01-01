import AdminSidebar from "@/src/components/UI/AdminSidebar";
import { adminLinks } from "@/src/components/UI/AdminSidebar/constant";
import SidebarMenu from "@/src/components/UI/SidebarMenu";
import React from "react";
import { DashboardNavbar } from "@/src/components/UI/DashboardNavbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto max-w-7xl px-6 flex-grow min-h-screen">
      <DashboardNavbar />
      <div className="md:hidden">
        <SidebarMenu links={adminLinks} />
      </div>
      <div className="my-3 flex w-full gap-3 justify-center">
        <div className=" md:w-2/6 min-h-full bg-default-100">
          <div className="hidden md:flex">
            <AdminSidebar />
          </div>
        </div>
        <div className="w-11/12 md:5/6">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
