"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createFollow = async (followData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/follow", followData);
    revalidateTag("SHOP");
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const unFollow = async (followData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch("/follow", followData);
    revalidateTag("SHOP");
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
