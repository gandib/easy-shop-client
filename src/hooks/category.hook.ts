import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  createCategory,
  updateCategoryById,
} from "../services/CategoryService";

export const useCreateCategory = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CATEGORY"],
    mutationFn: async (categoryData) => await createCategory(categoryData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateCategoryById = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (categoryData) => await updateCategoryById(categoryData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["CATEGORY"] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
