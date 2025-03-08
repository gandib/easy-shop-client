"use client";

import { IShop } from "@/src/types";
import { Button, Card } from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AllShopCard = ({ shop }: { shop: IShop[] }) => {
  const router = useRouter();

  const handleShop = (id: string) => {
    router.push(`/shop/${id}`);
  };
  return (
    <div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2">
        {shop?.map((data) => (
          <Card
            key={data?.id}
            className="flex flex-col items-center p-4 rounded-lg shadow"
          >
            <div className="h-[64px]">
              <Image
                src={data?.logo}
                width={64}
                height={64}
                alt={data?.name}
                className="rounded-full"
              />
            </div>
            <p className="mt-2 text-sm font-medium">{data?.name}</p>
            <p>Joined at {moment(data?.createdAt).format("MMM DD, YYYY")}</p>
            <p>
              Total Products:{" "}
              {data?.product?.length > 0 ? `${data?.product?.length}` : "0"}
            </p>
            <Button
              size="sm"
              className="bg-primary-500 text-white mt-2"
              onPress={() => handleShop(data?.id)}
            >
              Go to Shop
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllShopCard;
