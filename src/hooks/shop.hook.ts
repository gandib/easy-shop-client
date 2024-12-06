import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { createShop } from "../services/ShopService";
import { toast } from "sonner";

export const useCreateShop = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (shopData) => await createShop(shopData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
