"use client";

import { Button } from "@nextui-org/react";
import ESForm from "../form/ESForm";
import ESInput from "../form/ESInput";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import {
  useCreateCategory,
  useUpdateCategoryById,
} from "@/src/hooks/category.hook";
import { ICategory } from "@/src/types";
import { useState } from "react";

const CategoryManagementCard = ({
  title,
  category,
}: {
  title: string;
  category?: ICategory;
}) => {
  const router = useRouter();
  const { mutate: createrCategory, isPending, isSuccess } = useCreateCategory();
  const { mutate: updateCategory, isSuccess: updateSuccess } =
    useUpdateCategoryById();
  const [name, setName] = useState(category?.name || "");

  const onSubmit = (data: FieldValues) => {
    if (title === "Add") {
      createrCategory(data);
    }

    if (title === "Update") {
      const categoryData = {
        id: category?.id,
        data: {
          name: name,
        },
      };
      updateCategory(categoryData);
    }
  };

  if (isPending) {
    //handle loading state
  }

  if (isSuccess || updateSuccess) {
    router.push("/admin-dashboard");
  }
  return (
    <div className="flex mt-6 w-full flex-col items-center justify-center mb-12">
      <h3 className="my-2 text-2xl font-bold">{title} Category</h3>
      <div className=" w-[80%]">
        <ESForm
          onSubmit={onSubmit}
          //   resolver={zodResolver(registerValidationSchema)}
        >
          <div className="py-3">
            <ESInput
              name="name"
              label="Name"
              size="sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
            size="lg"
            type="submit"
          >
            Submit
          </Button>
        </ESForm>
      </div>
    </div>
  );
};

export default CategoryManagementCard;
