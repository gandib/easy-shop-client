"use client";
import AdminSidebar from "@/src/components/UI/AdminSidebar";
import Container from "@/src/components/UI/Container";
import ProfileSidebar from "@/src/components/UI/VendorSidebar";
import SidebarMenu from "@/src/components/UI/SidebarMenu";
import UserSidebar from "@/src/components/UI/UserSidebar";
import { userLinks } from "@/src/components/UI/UserSidebar/constant";
import React from "react";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Container>
      <Home onClick={() => router.push("/")} />
      <div className="md:hidden">
        <SidebarMenu links={userLinks} />
      </div>
      <div className="my-3 flex w-full gap-6 justify-center">
        <div className="md:w-2/6 hidden md:flex min-h-full bg-default-100">
          <UserSidebar />
        </div>
        <div className="w-11/12 md:5/6">{children}</div>
      </div>
    </Container>
  );
};

export default UserLayout;
