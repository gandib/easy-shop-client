"use server";

import { queryParams } from "@/src/components/UI/OrderHistoryCard";
import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createNewsletter = async (newsletterData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/newsletter", newsletterData);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const deleteNewsletterByEmail = async (email: string) => {
  try {
    const { data } = await axiosInstance.delete(`/newsletter/${email}`);
    revalidateTag("Newsletter");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
