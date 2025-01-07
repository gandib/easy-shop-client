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
      <h1 className="text-2xl font-bold my-6">Categories</h1>

      <div className="flex gap-4 overflow-x-auto scrollbar">
        {category?.map((cat) => (
          <div
            onClick={() => handleCategory(cat?.name)}
            key={cat?.id}
            className="w-30 p-4"
          >
            <div>
              <Card className="flex flex-col items-center cursor-pointer p-4 rounded-lg shadow hover:bg-gray-100 transition w-[150px] h-[150px]">
                <Image
                  src={cat?.img}
                  width={200}
                  height={200}
                  alt={cat?.name}
                  className="rounded-full h-full"
                />
                <p className="mt-2 text-sm font-medium">{cat?.name}</p>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDisplay;
