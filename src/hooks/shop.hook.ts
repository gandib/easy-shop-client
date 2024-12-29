import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import {
  createShop,
  getShopById,
  updateShopBlackList,
  updateShopById,
} from "../services/ShopService";
import { toast } from "sonner";

export const useCreateShop = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["SHOP"],
    mutationFn: async (shopData) => await createShop(shopData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useGetShopById = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["SHOP", id],
    queryFn: async () => await getShopById(id),
  });
};

export const useUpdateShopById = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (shopData) => await updateShopById(shopData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["SHOP"] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateShopBlackList = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (shopData) => await updateShopBlackList(shopData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["SHOP"] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
