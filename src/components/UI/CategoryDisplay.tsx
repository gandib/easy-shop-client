"use client";

import { ICategory } from "@/src/types";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const CategoryDisplay = ({ category }: { category: ICategory[] }) => {
  const router = useRouter();

  const handleCategory = (name: string) => {
    router.push(`/all-products?category=${name}`);
  };
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold my-2">Categories</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-2">
        {category?.map((cat) => (
          <Button
            onClick={() => handleCategory(cat?.name)}
            className="bg-purple-600 text-white"
            key={cat?.id}
          >
            {cat?.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryDisplay;
