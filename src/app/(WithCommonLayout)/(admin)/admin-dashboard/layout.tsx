"use client";
import AdminSidebar from "@/src/components/UI/AdminSidebar";
import { adminLinks } from "@/src/components/UI/AdminSidebar/constant";
import Container from "@/src/components/UI/Container";
import ProfileSidebar from "@/src/components/UI/VendorSidebar";
import SidebarMenu from "@/src/components/UI/SidebarMenu";
import React from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Container>
      <Home onClick={() => router.push("/")} />
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
    </Container>
  );
};

export default AdminLayout;
