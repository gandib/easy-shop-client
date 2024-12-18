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
      onClick={() =>
        router.push(
          `/${fromShop && fromShop ? "shop" : "vendor-dashboard"}/detail-product/${id}`
        )
      }
      className=""
    >
      See Detail
    </Button>
  );
};

export default SeeDetailButton;
