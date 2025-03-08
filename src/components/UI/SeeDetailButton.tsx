"use client";

import { Button } from "@nextui-org/react";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

const SeeDetailButton = ({
  id,
  fromShop,
}: {
  id: string;
  fromShop?: string;
  fromHome?: string;
}) => {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        router.push(
          `/${fromShop && fromShop ? "shop" : "vendor-dashboard"}/detail-product/${id}`
        )
      }
      className="bg-gray-100 text-black p-2 rounded-md hover:bg-secondary-500 hover:text-white"
    >
      <Eye size={20} />
    </button>
  );
};

export default SeeDetailButton;
