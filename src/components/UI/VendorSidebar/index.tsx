"use client";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useUser } from "@/src/context/user.provider";
import { Spinner } from "@nextui-org/spinner";
import Image from "next/image";
import VendorSidebarOptions from "./VendorSidebarOptions";
import { vendorLinks } from "./constant";
import { useEffect } from "react";

const VendorSidebar = () => {
  const { user: userData, isLoading } = useUser();

  return (
    <div className="">
      <div className="mt-3 space-y-2 min-h-screen rounded-xl bg-default-100 p-2">
        {isLoading && (
          <div className="  fixed w-1/4 h-14 rounded-md  flex justify-center items-center">
            <Spinner />
          </div>
        )}

        <VendorSidebarOptions links={vendorLinks} />
      </div>
    </div>
  );
};

export default VendorSidebar;
