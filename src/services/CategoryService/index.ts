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
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};

export const getCategoryById = async (id: string) => {
  const url = `${envConfig.baseApi}/category/${id}`;
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};

export const updateCategoryById = async (categoryData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/category/${categoryData.id}`,
      categoryData.data
    );
    revalidateTag("CATEGORY");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
