"use client";
import { useUpdateCategoryById } from "@/src/hooks/category.hook";
import { ICategory } from "@/src/types";
import { Button } from "@nextui-org/react";
import {
  Card as NextUiCard,
  CardHeader,
  CardFooter,
  CardBody,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CategoryDisplayCard = ({ category }: { category: ICategory }) => {
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
    <div>
      <NextUiCard>
        <CardHeader className="flex justify-center items-center">
          <Image
            src={category?.img}
            width={128}
            height={128}
            alt={category?.name}
          />
        </CardHeader>
        <CardBody>
          <h1>{category?.name}</h1>
        </CardBody>
        <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
          <Button
            className="text-white bg-primary-500"
            onPress={() =>
              router.push(`/admin-dashboard/update-category/${category?.id}`)
            }
          >
            Update
          </Button>
          <Button
            className="text-white bg-danger-500"
            onPress={() => handleDelete()}
          >
            Delete
          </Button>
        </CardFooter>
      </NextUiCard>
    </div>
  );
};

export default CategoryDisplayCard;
