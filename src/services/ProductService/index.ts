"use server";
import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createProduct = async (productData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/product", productData);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllProducts = async () => {
  const url = `${envConfig.baseApi}/product`;
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

export const getAllProductsByShopId = async () => {
  const url = `${envConfig.baseApi}/product/all-products-by-shop`;
  const token = cookies().get("accessToken")?.value;

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

export const getProductById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/product/${id}`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateProductById = async (productData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/product/${productData.id}`,
      productData.data
    );
    revalidateTag("product");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
