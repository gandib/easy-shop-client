"use server";
import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createCategory = async (categoryData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/category", categoryData);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllCategory = async () => {
  const url = `${envConfig.baseApi}/category`;
  const token = cookies().get("accessToken")?.value;

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      //   headers: {
      //     Authorization: `${token}`,
      //   },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching my recipes:", error);
    throw error;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/category/${id}`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateCategoryById = async (categoryData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/Category/${categoryData.id}`,
      categoryData.data
    );
    revalidateTag("Category");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
