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

      <div className="xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-3 md:grid md:grid-cols-4 lg:grid lg:grid-cols-6 gap-2">
        {category?.map((cat) => (
          <div
            onClick={() => handleCategory(cat?.name)}
            key={cat?.id}
            className="w-30 p-4"
          >
            <Card className="flex flex-col items-center cursor-pointer p-2 rounded-lg shadow hover:bg-gray-100 transition w-full h-[170px]">
              <div className="h-[100px] w-[120px]">
                <Image
                  src={cat?.img}
                  width={150}
                  height={120}
                  alt={cat?.name}
                  className="rounded-full h-full"
                />
                <p className="my-2 text-sm font-medium p-1 ">{cat?.name}</p>
              </div>
            </Card>
          </div>
        ))}

        {!category.length && "No categories to show!"}
      </div>
    </div>
  );
};

export default CategoryDisplay;
