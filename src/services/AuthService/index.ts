"use server";

import axiosInstance from "@/src/lib/AxiosInstance";
import { IUser } from "@/src/types";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);
    console.log(data);
    if (data?.success) {
      cookies().set("accessToken", data?.data?.accessToken, { maxAge: 604800 });
    }

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const forgetPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/forget-password",
      userData
    );
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

export const recoverPassword = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/auth/reset-password",
      userData.data,
      {
        headers: {
          Authorization: `${userData.token}`,
        },
      }
    );
    if (data?.success) {
      cookies().set("accessToken", data?.token, { maxAge: 604800 });
    }

    return data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.message);
    } else {
      throw new Error(error);
    }
  }
};

export const logout = () => {
  cookies().delete("accessToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;
  let decodedToken: IUser | null = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    return {
      email: decodedToken?.email,
      role: decodedToken?.role,
    };
  }

  return decodedToken;
};
