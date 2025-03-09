"use client";
import { Spinner } from "@nextui-org/react";
import { Navbar } from "../components/UI/Shared/navbar";
import { usePathname } from "next/navigation";
import { DashboardNavbar } from "../components/UI/Dashboard/DashboardNavbar";
import Loading from "../components/UI/Shared/Loading";

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
      <div className="flex justify-center items-center mt-20">
        {/* <Spinner /> */}
        <Loading />
      </div>
    </div>
  );
}
