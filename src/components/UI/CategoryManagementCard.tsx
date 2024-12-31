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
import { ChangeEvent, useEffect, useState } from "react";

const CategoryManagementCard = ({
  title,
  category,
}: {
  title: string;
  category?: ICategory;
}) => {
  const router = useRouter();
  const { mutate: createCategory, isPending, isSuccess } = useCreateCategory();
  const { mutate: updateCategory, isSuccess: updateSuccess } =
    useUpdateCategoryById();
  const [name, setName] = useState(category?.name || "");
  const [img, setImg] = useState(category?.img || "");
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [imgError, setImgError] = useState("");

  useEffect(() => {
    if (imageFiles[0]) {
      setImgError("");
    }
  }, [imageFiles]);

  const onSubmit = (data: FieldValues) => {
    if (title === "Add" && !imageFiles[0]) {
      setImgError("Please choose an image!");
      return;
    }

    const formData = new FormData();
    const categoryData = {
      ...data,
      img: "",
    };

    formData.append("data", JSON.stringify(categoryData));

    formData.append("file", imageFiles[0]);

    if (title === "Add") {
      createCategory(formData);
    }

    if (title === "Update") {
      const categoryData = {
        id: category?.id,
        data: {
          name: name,
          img: img,
        },
      };
      updateCategory(categoryData);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles([file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews([reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  if (isPending) {
    //handle loading state
  }

  useEffect(() => {
    if (isSuccess || updateSuccess) {
      router.push("/admin-dashboard/all-categories");
    }
  }, [isSuccess, updateSuccess]);

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
              required={title === "Add"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {title === "Update" && (
            <div className="py-3">
              <ESInput
                name="img"
                label="Image"
                size="sm"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
            </div>
          )}

          {title === "Add" && (
            <div className="min-w-fit flex-1 h-12">
              <label
                className="bg-default-50/10 border-2 p-3 w-full h-full rounded-md flex items-center font-light"
                htmlFor="image"
              >
                Upload image
              </label>
              <input
                className="hidden"
                type="file"
                id="image"
                onChange={(e) => handleImageChange(e)}
              />
            </div>
          )}
          {title === "Add" && imgError && (
            <p className="text-tiny text-red-500">Please choose an image!</p>
          )}
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-5 my-5">
              <div className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2">
                <img
                  src={imagePreviews[0] as string}
                  //   alt="item"
                  className="h-full w-full object-cover object-center rounded-md"
                />
              </div>
            </div>
          )}

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
