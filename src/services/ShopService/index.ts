"use server";
import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { revalidateTag } from "next/cache";
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
  try {
    const { data } = await axiosInstance.get(`/shop`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getShopById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/shop/${id}`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
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
