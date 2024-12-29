import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { createFollow, unFollow } from "../services/FollowService";

export const useCreateFollow = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["SHOP"],
    mutationFn: async (followData) => await createFollow(followData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUnFollow = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["SHOP"],
    mutationFn: async (followData) => await unFollow(followData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
