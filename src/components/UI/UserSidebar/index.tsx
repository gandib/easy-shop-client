"use client";

import { useUser } from "@/src/context/user.provider";
import { Spinner } from "@nextui-org/spinner";
import { userLinks } from "./constant";
import UserSidebarOptions from "./UserSidebarOptions";

const UserSidebar = () => {
  const { user: userData, isLoading } = useUser();

  return (
    <div className="">
      <div className="mt-3 space-y-2 min-h-screen rounded-xl bg-default-100 p-2">
        {isLoading && (
          <div className="  fixed w-1/4 h-14 rounded-md  flex justify-center items-center">
            <Spinner />
          </div>
        )}

        <UserSidebarOptions links={userLinks} />
      </div>
    </div>
  );
};

export default UserSidebar;
