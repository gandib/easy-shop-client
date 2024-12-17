"use client";
import ESForm from "@/src/components/form/ESForm";
import ESInput from "@/src/components/form/ESInput";
import ESTextarea from "@/src/components/form/FXTextarea";
import { useUpdateShopById } from "@/src/hooks/shop.hook";
import { IShop } from "@/src/types";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

const UpdateShop = ({ shop }: { shop: IShop }) => {
  const {
    mutate: handleUpdateShop,
    isPending,
    isSuccess,
  } = useUpdateShopById();
  const [name, setName] = useState(shop?.name);
  const [description, setDescription] = useState(shop?.description);
  const [logo, setLogo] = useState(shop?.logo);
  const router = useRouter();

  useEffect(() => {
    if (shop) {
      setName(shop.name);
      setDescription(shop.description);
      setLogo(shop.logo);
    }
  }, [shop]);

  const onSubmit = (data: FieldValues) => {
    const updateData = {
      id: shop?.id,
      data,
    };
    handleUpdateShop(updateData);
  };

  if (isPending) {
    //handle loading state
  }

  if (isSuccess) {
    router.push("/vendor-dashboard");
  }
  return (
    <div>
      <div className="flex mt-6 w-full flex-col items-center justify-center mb-12">
        <h3 className="my-2 text-2xl font-bold">Update Shop</h3>
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
                name="logo"
                label="Logo Link"
                size="sm"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
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
    </div>
  );
};

export default UpdateShop;
