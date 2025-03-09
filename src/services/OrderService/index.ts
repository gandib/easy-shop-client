"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";
import { queryParams } from "@/src/types";
import axios from "axios";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const createOrder = async (orderData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/order", orderData);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllOrder = async (query: queryParams[]) => {
  const params = new URLSearchParams();
  if (query) {
    query.forEach((item) => {
      params.append(item.name, item.value as string);
    });
  }

  const url = `${envConfig.baseApi}/order?${params.toString()}`;
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

export const getOrderById = async (id: string) => {
  const url = `${envConfig.baseApi}/order/${id}`;
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
