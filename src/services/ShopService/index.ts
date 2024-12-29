"use server";
import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createShop = async (shopData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/shop", shopData);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllShop = async () => {
  const url = `${envConfig.baseApi}/shop`;
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching my recipes:", error);
    throw error;
  }
};

export const getShopById = async (id: string) => {
  const url = `${envConfig.baseApi}/shop/${id}`;
  const token = (await cookies()).get("accessToken")?.value;

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching my recipes:", error);
    throw error;
  }
};

export const updateShopById = async (shopData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/shop/${shopData.id}`,
      shopData.data
    );
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

export const updateShopBlackList = async (shopData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/shop/black-list/${shopData.id}`,
      shopData.data
    );
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
