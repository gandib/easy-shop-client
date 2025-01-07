"use client";
import ESForm from "@/src/components/form/ESForm";
import ESInput from "@/src/components/form/ESInput";
import ESSelect from "@/src/components/form/ESSelect";
import ESTextarea from "@/src/components/form/FXTextarea";
import { useUser } from "@/src/context/user.provider";
import { useCreateProduct, useUpdateProduct } from "@/src/hooks/product.hook";
import { ICategory, IProduct, IShop } from "@/src/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

const ProductManageCard = ({
  category,
  shop,
  title,
  product,
}: {
  category: ICategory[];
  shop: IShop;
  title: string;
  product?: IProduct;
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
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || "");
  const [description, setDescription] = useState(product?.description || "");
  const [quantity, setQuantity] = useState(product?.quantity || "");
  const [discount, setDiscount] = useState(product?.discount || "");
  const [img, setImg] = useState(product?.img[0] || "");
  const { mutate: handleUpdateProduct, isSuccess: productUpSuccess } =
    useUpdateProduct();

  const categoryOptions = category.map((catData) => ({
    key: catData?.id,
    label: catData?.name,
  }));

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();
    if (title === "Duplicate" && data.categoryId === "") {
      data.categoryId = product?.categoryId;
    }

    const productData = {
      ...data,
      shopId: shop?.id,
      price: Number(data.price),
      quantity: Number(data.quantity),
      discount: Number(data.discount),
    };

    if (title === "Update") {
      const updatedProductData = {
        id: product?.id,
        data: {
          name: name,
          category: data?.category,
          description: data.description || description,
          price: Number(price),
          quantity: Number(quantity),
          discount: Number(discount),
          img: [data.img || img, ...product?.img!],
          // img: [
          //   "https://res.cloudinary.com/dvka5l5tj/image/upload/v1735653089/Samsung%20A%2015%20New-1735653090284-3103265.jpg",
          //   "https://res.cloudinary.com/dvka5l5tj/image/upload/v1735653088/Samsung%20A%2015%20New-1735653088979-358317269.jpg",
          //   "https://res.cloudinary.com/dvka5l5tj/image/upload/v1735653090/Samsung%20A%2015%20New-1735653090957-249633208.jpg",
          // ],
        },
      };

      handleUpdateProduct(updatedProductData);
    }

    formData.append("data", JSON.stringify(productData));

    // formData.append("file", imageFiles[0]);
    for (let image of imageFiles) {
      formData.append("file", image);
    }
    if (title === "Add" || title === "Duplicate") {
      handleCreateProduct(formData);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
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

  useEffect(() => {
    if (isSuccess || productUpSuccess) {
      router.push("/vendor-dashboard/all-products");
    }
  }, [isSuccess, productUpSuccess]);

  return (
    <div>
      <div className="flex w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">{title} Product</h3>
        <div className=" w-[80%]">
          <ESForm
            onSubmit={onSubmit}
            // resolver={zodResolver(createShopValidationSchema)}
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
            <div className="py-3">
              <ESInput
                name="price"
                label="Price"
                size="sm"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
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
              <ESInput
                name="quantity"
                label="quantity"
                size="sm"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="py-3">
              <ESInput
                name="discount"
                label="Discount"
                size="sm"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>

            {title === "Update" && (
              <div className="py-3">
                <ESInput
                  name="img"
                  label="Image link"
                  size="sm"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                />
              </div>
            )}

            {(title === "Add" || title === "Duplicate") && (
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
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-5 my-5">
                {imagePreviews?.map((image, index) => (
                  <div
                    key={index}
                    className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                  >
                    <img
                      src={image as string}
                      //   alt="item"
                      className="h-full w-full object-cover object-center rounded-md"
                    />
                  </div>
                ))}
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
