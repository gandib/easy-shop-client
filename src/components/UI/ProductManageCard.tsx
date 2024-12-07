"use client";
import ESForm from "@/src/components/form/ESForm";
import ESInput from "@/src/components/form/ESInput";
import ESSelect from "@/src/components/form/ESSelect";
import ESTextarea from "@/src/components/form/FXTextarea";
import { useUser } from "@/src/context/user.provider";
import { useCreateProduct } from "@/src/hooks/product.hook";
import { useCreateShop } from "@/src/hooks/shop.hook";
import { ICategory, IShop } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FieldValues } from "react-hook-form";

const ProductManageCard = ({
  category,
  shop,
}: {
  category: ICategory[];
  shop: IShop;
}) => {
  const { user, isLoading } = useUser();
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const {
    mutate: handleCreateProduct,
    isPending,
    isSuccess,
  } = useCreateProduct();
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");

  const categoryOptions = category.map((catData) => ({
    key: catData?.id,
    label: catData?.name,
  }));

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();
    const productData = {
      ...data,
      shopId: shop?.id,
      price: Number(data.price),
      quantity: Number(data.quantity),
      discount: Number(data.discount),
    };

    formData.append("data", JSON.stringify(productData));

    formData.append("file", imageFiles[0]);

    handleCreateProduct(formData);
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

  if (isLoading) {
    <p>Loading...</p>;
  }

  if (isSuccess) {
    router.push("/vendor-dashboard");
  }
  return (
    <div>
      <div className="flex mt-6 w-full flex-col items-center justify-center mb-12">
        <h3 className="my-2 text-2xl font-bold">Add Product</h3>
        <div className=" w-[80%]">
          <ESForm
            onSubmit={onSubmit}
            // resolver={zodResolver(createShopValidationSchema)}
          >
            <div className="py-3">
              <ESInput name="name" label="Name" size="sm" />
            </div>
            <div className="py-3">
              <ESInput name="price" label="Price" size="sm" />
            </div>
            <div className="py-3">
              <ESSelect
                name="categoryId"
                label="Category"
                options={categoryOptions}
                size="sm"
              />
            </div>
            <div className="py-3">
              <ESTextarea
                name="description"
                label="Description"
                size="sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="py-3">
              <ESInput name="quantity" label="quantity" size="sm" />
            </div>
            <div className="py-3">
              <ESInput name="discount" label="Discount" size="sm" />
            </div>

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
    </div>
  );
};

export default ProductManageCard;
