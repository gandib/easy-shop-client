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
        <CardHeader></CardHeader>
        <CardBody>
          <h1>{category?.name}</h1>
        </CardBody>
        <CardFooter className=" bottom-0 gap-2 justify-around border-t-1 border-zinc-100/50 bg-white/30">
          <Button
            onPress={() =>
              router.push(`/admin-dashboard/update-category/${category?.id}`)
            }
          >
            Update
          </Button>
          <Button onPress={() => handleDelete()}>Delete</Button>
        </CardFooter>
      </NextUiCard>
    </div>
  );
};

export default CategoryDisplayCard;
