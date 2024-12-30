import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  createNewsletter,
  deleteNewsletterByEmail,
} from "../services/NewsletterService";

export const useCreateNewsletter = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["Newsletter"],
    mutationFn: async (data) => await createNewsletter(data),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useDeleteNewsletter = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["Newsletter"],
    mutationFn: async (email) => await deleteNewsletterByEmail(email),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
