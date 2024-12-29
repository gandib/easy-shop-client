import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { createOrder } from "../services/OrderService";

export const useCreateOrder = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["ORDER"],
    mutationFn: async (orderData) => await createOrder(orderData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
