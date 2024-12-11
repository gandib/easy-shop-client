import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  getAllUser,
  registerUser,
  updateUser,
  updateUserStatus,
} from "../services/UserService";
import next from "next";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess(data, variables, context) {
      toast.success(data.message);
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useGetAllUser = (email: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["USER", email],
    queryFn: async () => await getAllUser(),
  });
};

export const useUpdateUser = (email: string) => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (userData) => await updateUser(userData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["USER", email] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationFn: async (userData) => await updateUserStatus(userData),

    onSuccess(data, variables, context) {
      toast.success(data.message);
      // Invalidate the specific query using the query key with email
      queryClient.invalidateQueries({ queryKey: ["USER"] });
    },
    onError(error, variables, context) {
      toast.error(error.message);
    },
  });
};
