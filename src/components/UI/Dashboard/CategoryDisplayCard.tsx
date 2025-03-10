"use client";

import { CardBody, CardHeader, Card as NextUiCard } from "@nextui-org/react";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { ICategory } from "@/src/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUpdateCategoryById } from "@/src/hooks/category.hook";

const CategoryDisplayCard = ({ category }: { category: ICategory }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const router = useRouter();
  const { mutate: updateCategory } = useUpdateCategoryById();

  const handleDelete = () => {
    const categoryData = {
      id: category?.id,
      data: {
        isDeleted: true,
      },
    };
    updateCategory(categoryData);
  };

  return (
    <NextUiCard
      isFooterBlurred
      className="rounded-t-none shadow-xl p-4 border-1 border-t-0 rounded-md relative overflow-hidden"
      onMouseEnter={() => setHoveredId(category.id)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <CardHeader className="h-[128px] px-0 py-0 w-full flex justify-center relative">
        {category?.img && (
          <Image
            width={128}
            height={128}
            src={category?.img}
            alt="Category image"
            className="h-full"
          />
        )}

        <>
          <div
            className={`absolute bottom-14 left-2 transition-all duration-300 ease-in-out 
        ${hoveredId === category.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          >
            <button
              className="bg-gray-100 text-black hover:bg-secondary-500 hover:text-white p-2 rounded-md"
              onClick={() =>
                router.push(`/admin-dashboard/update-category/${category?.id}`)
              }
            >
              <Edit size={20} />
            </button>
          </div>
          <div
            className={`absolute bottom-2 left-2 transition-all duration-300 ease-in-out 
        ${hoveredId === category.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          >
            <button
              onClick={() => handleDelete()}
              className="bg-gray-100 text-danger-500 hover:bg-danger-500 hover:text-white p-2 rounded-md"
            >
              <Trash size={20} />
            </button>
          </div>
        </>
      </CardHeader>

      <CardBody>
        <div className=" w-full flex flex-col justify-center items-center">
          {/* <ShopRedirect shop={data?.shop} /> */}

          <h4 className="rounded text-xl  pt-2 text-secondary-500">
            {category?.name}
          </h4>
        </div>
      </CardBody>
    </NextUiCard>
  );
};

export default CategoryDisplayCard;
