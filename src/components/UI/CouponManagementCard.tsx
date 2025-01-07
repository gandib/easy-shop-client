"use client";

import { Button } from "@nextui-org/react";
import ESForm from "../form/ESForm";
import ESInput from "../form/ESInput";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { ICoupon } from "@/src/types";
import { useState } from "react";
import ESDatePicker from "../form/ESDatePicker";
import dateToISO from "@/src/utils/dateToISO";
import {
  useCreateCoupon,
  useUpdateCouponById,
} from "@/src/hooks/couponAndFlashSale.hook";

const CouponManagementCard = ({
  title,
  coupon,
}: {
  title: string;
  coupon?: ICoupon;
}) => {
  const router = useRouter();
  const { mutate: createrCoupon, isPending, isSuccess } = useCreateCoupon();
  const { mutate: updateCoupon, isSuccess: updateSuccess } =
    useUpdateCouponById();
  const [code, setCode] = useState(coupon?.code || "");
  const [percentage, setPercentage] = useState(coupon?.percentage || "");
  const [expiryDate, setExpiryDate] = useState(coupon?.expiryDate);

  const onSubmit = (data: FieldValues) => {
    if (title === "Create") {
      const createData = {
        ...data,
        percentage: Number(data.percentage),
        expiryDate: dateToISO(data.expiryDate),
      };
      createrCoupon(createData);
    }

    if (title === "Update") {
      const couponData = {
        id: coupon?.id,
        data: {
          ...data,
          percentage: Number(data.percentage || percentage),
          expiryDate:
            data.expiryDate === undefined
              ? dateToISO(expiryDate)
              : dateToISO(data.expiryDate),
        },
      };

      updateCoupon(couponData);
    }
  };

  if (isPending) {
    //handle loading state
  }

  if (isSuccess || updateSuccess) {
    router.push("/vendor-dashboard/all-coupon");
  }
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <h3 className="my-2 text-2xl font-bold">{title} Coupon</h3>
      <div className=" w-[80%]">
        <ESForm
          onSubmit={onSubmit}
          //   resolver={zodResolver(registerValidationSchema)}
        >
          <div className="py-3">
            <ESInput
              name="code"
              label="Code"
              size="sm"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
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

export default CouponManagementCard;
