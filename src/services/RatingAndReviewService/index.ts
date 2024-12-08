"use server";
import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { FieldValues } from "react-hook-form";

export const createRating = async (ratingData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/rating", ratingData);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const createReview = async (reviewData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/review", reviewData);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
