"use client";

import { ICategory } from "@/src/types";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CategoryDisplay = ({ category }: { category: ICategory[] }) => {
  const router = useRouter();

  const handleCategory = (name: string) => {
    router.push(`/all-products?category=${name}`);
  };
  return (
    <div className="pt-16">
      <h1 className="text-2xl font-bold mb-2">Categories</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-2">
        {category?.map((cat) => (
          <Button
            onPress={() => handleCategory(cat?.name)}
            className="bg-secondary-600 text-white"
            key={cat?.id}
          >
            {cat?.name}
          </Button>
          // <Link href={`/all-products?category=${cat?.name}`}>{cat?.name}</Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryDisplay;
