"use client";

import { useUser } from "@/src/context/user.provider";
import { Spinner } from "@nextui-org/react";
import VendorSidebarOptions from "./VendorSidebarOptions";
import { vendorLinks } from "./constant";

const VendorSidebar = () => {
  const { user: userData, isLoading } = useUser();

  if (isLoading) {
    <p>Loading</p>;
  }
  return (
    <div className="">
      <div className="mt-3 space-y-2 min-h-screen rounded-xl text-white p-2">
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
