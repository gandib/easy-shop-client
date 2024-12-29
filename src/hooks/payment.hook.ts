import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { orderPayment } from "../services/Payment";
import { toast } from "sonner";

export const useOrderPayment = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["PAYMENT"],
    mutationFn: async (paymentData) => await orderPayment(paymentData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
