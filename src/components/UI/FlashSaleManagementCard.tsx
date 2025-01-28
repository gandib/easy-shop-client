"use client";

import { Button } from "@nextui-org/react";
import ESForm from "../form/ESForm";
import ESInput from "../form/ESInput";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { IFlashSale, IProduct, IShop } from "@/src/types";
import { useEffect, useState } from "react";
import ESDatePicker from "../form/ESDatePicker";
import dateToISO from "@/src/utils/dateToISO";
import {
  useCreateFlashSale,
  useUpdateFlshSaleById,
} from "@/src/hooks/couponAndFlashSale.hook";
import ESSelect from "../form/ESSelect";

const FlashSaleManagementCard = ({
  title,
  flashSale,
  shop,
}: {
  title: string;
  flashSale?: IFlashSale;
  shop?: IShop;
}) => {
  const router = useRouter();
  const {
    mutate: createrFlashSale,
    isPending,
    isSuccess,
  } = useCreateFlashSale();
  const { mutate: updateFlashSale, isSuccess: updateSuccess } =
    useUpdateFlshSaleById();
  const [productId, setProductId] = useState(flashSale?.productId || "");
  const [percentage, setPercentage] = useState(flashSale?.percentage || "");
  const [expiryDate, setExpiryDate] = useState(flashSale?.expiryDate);

  const productOptions = shop?.product?.map((product: IProduct) => ({
    key: product?.id,
    label: product?.name,
  }));

  const onSubmit = (data: FieldValues) => {
    if (title === "Create") {
      const createData = {
        ...data,
        percentage: Number(data.percentage),
        expiryDate: dateToISO(data.expiryDate),
      };
      createrFlashSale(createData);
    }

    if (title === "Update") {
      const couponData = {
        id: flashSale?.id,
        data: {
          ...data,
          percentage: Number(data.percentage || percentage),
          expiryDate:
            data.expiryDate === undefined
              ? dateToISO(expiryDate)
              : dateToISO(data.expiryDate),
        },
      };

      updateFlashSale(couponData);
    }
  };

  if (isPending) {
    //handle loading state
  }

  useEffect(() => {
    if (isSuccess || updateSuccess) {
      router.push("/vendor-dashboard/all-flash-sale");
    }
  }, [updateSuccess, isSuccess, router]);
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h3 className="my-2 text-2xl font-bold">{title} Flash Sale</h3>
      <div className=" w-[80%]">
        <ESForm
          onSubmit={onSubmit}
          //   resolver={zodResolver(registerValidationSchema)}
        >
          {title === "Create" && (
            <div className="py-3">
              <ESSelect
                name="productId"
                label="Product Id"
                size="sm"
                options={productOptions!}
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>
          )}
          <div className="py-3">
            <ESInput
              name="percentage"
              label="Percentage"
              size="sm"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </div>
          <div className="py-3">
            <ESDatePicker name="expiryDate" label="Expiry Date" />
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

export default FlashSaleManagementCard;
