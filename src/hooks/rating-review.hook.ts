import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  createRating,
  createReview,
  createReviewResponse,
} from "../services/RatingAndReviewService";

export const useCreateRating = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["RATING"],
    mutationFn: async (ratingData) => await createRating(ratingData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useCreateReview = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["REVIEW"],
    mutationFn: async (reviewData) => await createReview(reviewData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const usecreateReviewResponse = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["REVIEW"],
    mutationFn: async (responseData) =>
      await createReviewResponse(responseData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
