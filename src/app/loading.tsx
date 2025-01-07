"use client";
import { Spinner } from "@nextui-org/react";
import { Navbar } from "../components/UI/navbar";
import { usePathname } from "next/navigation";
import { DashboardNavbar } from "../components/UI/DashboardNavbar";

export default function loading() {
  const pathname = usePathname();

  return (
    <div>
      {pathname.includes("admin-dashboard") ? (
        <DashboardNavbar />
      ) : pathname.includes("vendor-dashboard") ? (
        <DashboardNavbar />
      ) : pathname.includes("user-dashboard") ? (
        <DashboardNavbar />
      ) : (
        <Navbar />
      )}
      {/* <Navbar /> */}
      <div className="flex justify-center items-center mt-12">
        <Spinner />
      </div>
    </div>
  );
}
