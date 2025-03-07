"use client";

import ESForm from "@/src/components/form/ESForm";
import ESInput from "@/src/components/form/ESInput";
import { Button } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { useRecoverPassword } from "@/src/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/src/components/UI/Shared/Loading";
import { useUser } from "@/src/context/user.provider";
import recoverPasswordValidationSchema from "@/src/schemas/recover-password.schemas";
import { useEffect } from "react";

const RecoverPassword = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { setIsLoading } = useUser();

  const {
    mutate: handleRecoverPassword,
    isPending,
    isSuccess,
  } = useRecoverPassword();

  const onSubmit = (data: FieldValues) => {
    const recoverData = {
      token: searchParams?.get("token"),
      data: {
        id: searchParams?.get("userId"),
        password: data.newPassword,
      },
    };

    handleRecoverPassword(recoverData);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, router]);

  return (
    <div className="min-h-screen">
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center ">
        <h3 className="my-2 text-2xl font-bold">Recover Password</h3>
        <div className="w-[35%]">
          <ESForm
            onSubmit={onSubmit}
            resolver={zodResolver(recoverPasswordValidationSchema)}
          >
            <div className="py-3">
              <ESInput name="newPassword" type="password" label="Password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Submit
            </Button>
          </ESForm>
        </div>
      </div>
    </div>
  );
};

export default RecoverPassword;
