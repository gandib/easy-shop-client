"use client";
import Container from "@/src/components/UI/Container";
import SidebarMenu from "@/src/components/UI/SidebarMenu";
import { userLinks } from "@/src/components/UI/UserSidebar/constant";
import VendorSidebar from "@/src/components/UI/VendorSidebar";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

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
          <VendorSidebar />
        </div>
        <div className="w-11/12 md:5/6">{children}</div>
      </div>
    </Container>
  );
};

export default UserLayout;
