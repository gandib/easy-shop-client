"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import axios from "axios";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/user", userData);

    // if (data?.success) {
    //   cookies().set("accessToken", data?.token, { maxAge: 604800 });
    // }

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getUser = async (email: string) => {
  try {
    const { data } = await axiosInstance.get(`/user/${email}`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getAllUser = async () => {
  try {
    const { data } = await axiosInstance.get(`/user`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const getUserById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/user/email`);

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(`/user/email`, userData.data);
    revalidateTag("USER");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const updateUserStatus = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `/user/status-change`,
      userData.data
    );
    revalidateTag("USER");

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};
