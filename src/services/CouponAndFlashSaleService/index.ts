"use server";
import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createCoupon = async (couponData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/coupon", couponData);
    revalidateTag("COUPON");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const createFlashSale = async (flashSaleData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/flash-sale", flashSaleData);
    revalidateTag("FLASHSALE");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllCoupon = async () => {
  const url = `${envConfig.baseApi}/coupon`;
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
    console.error("Error fetching my recipes:", error);
    throw error;
  }
};

export const getAllFlashSale = async () => {
  const url = `${envConfig.baseApi}/flash-sale`;
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
    console.error("Error fetching my recipes:", error);
    throw error;
  }
};

export const getSingleCoupon = async (id: string) => {
  let fetchOptions = {};
  const token = (await cookies()).get("accessToken")?.value;

  fetchOptions = {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(`${envConfig.baseApi}/coupon/${id}`, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }
  return res.json();
};

export const getSingleFlashSale = async (id: string) => {
  let fetchOptions = {};
  const token = (await cookies()).get("accessToken")?.value;

  fetchOptions = {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(
    `${envConfig.baseApi}/flash-sale/${id}`,
    fetchOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }
  return res.json();
};

export const updateCouponById = async (couponData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/coupon/${couponData.id}`,
      couponData.data
    );
    revalidateTag("COUPON");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateFlashSaleById = async (flashSaleData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/flash-sale/${flashSaleData.id}`,
      flashSaleData.data
    );
    revalidateTag("FLASHSALE");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
