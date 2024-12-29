import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  createProduct,
  deleteProductById,
  updateProductById,
} from "../services/ProductService";

export const useCreateProduct = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["PRODUCT"],
    mutationFn: async (productData) => await createProduct(productData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateProduct = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["PRODUCT"],
    mutationFn: async (productData) => await updateProductById(productData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useDeleteProduct = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["PRODUCT"],
    mutationFn: async (productData) => await deleteProductById(productData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
