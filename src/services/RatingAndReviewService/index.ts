"use server";
import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createRating = async (ratingData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/rating", ratingData);
    revalidateTag("PRODUCT");

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
    revalidateTag("PRODUCT");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllRating = async () => {
  const url = `${envConfig.baseApi}/rating`;
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

export const getAllReview = async () => {
  const url = `${envConfig.baseApi}/review`;
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

export const getReviewById = async (id: string) => {
  const url = `${envConfig.baseApi}/review/${id}`;
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

export const createReviewResponse = async (responseData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/shop-response", responseData);
    revalidateTag("REVIEW");
    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
