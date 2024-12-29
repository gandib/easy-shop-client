import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  createCoupon,
  createFlashSale,
  updateCouponById,
  updateFlashSaleById,
} from "../services/CouponAndFlashSaleService";

export const useCreateCoupon = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["COUPON"],
    mutationFn: async (couponData) => await createCoupon(couponData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useCreateFlashSale = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FLASHSALE"],
    mutationFn: async (flashSaleData) => await createFlashSale(flashSaleData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateCouponById = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (couponData) => await updateCouponById(couponData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["COUPON"] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateFlshSaleById = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (flashSaleData) =>
      await updateFlashSaleById(flashSaleData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["FLASHSALE"] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
