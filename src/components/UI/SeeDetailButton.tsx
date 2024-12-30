"use client";

import { Button } from "@nextui-org/react";
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
    <Button
      size="sm"
      onPress={() =>
        router.push(
          `/${fromShop && fromShop ? "shop" : "vendor-dashboard"}/detail-product/${id}`
        )
      }
      className="bg-secondary-500 text-white"
    >
      See Detail
    </Button>
  );
};

export default SeeDetailButton;
