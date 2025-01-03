"use client";

import { ICategory } from "@/src/types";
import { Card } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CategoryDisplay = ({ category }: { category: ICategory[] }) => {
  const router = useRouter();

  const handleCategory = (name: string) => {
    router.push(`/all-products?category=${name}`);
  };

  return (
    <div className="pt-8">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {category?.map((cat) => (
          <Card
            key={cat?.id}
            onPress={() => handleCategory(cat?.name)}
            className="flex flex-col items-center cursor-pointer p-4 rounded-lg shadow hover:bg-gray-100 transition"
          >
            <Image
              src={cat?.img}
              width={64}
              height={64}
              alt={cat?.name}
              className="rounded-full"
            />
            <p className="mt-2 text-sm font-medium">{cat?.name}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryDisplay;
