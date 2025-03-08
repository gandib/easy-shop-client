"use client";

import ESForm from "@/src/components/form/ESForm";
import ESInput from "@/src/components/form/ESInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import { FieldValues } from "react-hook-form";
import { useChangePassword } from "@/src/hooks/auth.hook";
import { useRouter } from "next/navigation";
import Container from "@/src/components/UI/Shared/Container";
import { useEffect } from "react";

export default function ChangePassword() {
  const {
    mutate: handleChangePassword,
    isPending,
    isSuccess,
  } = useChangePassword();
  const router = useRouter();

  const onSubmit = (data: FieldValues) => {
    let userData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    handleChangePassword(userData!);
  };

  if (isPending) {
    //handle loading state
  }

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/admin-dashboard");
    }
  }, [isPending, isSuccess, router]);

  return (
    <Container>
      <div className="flex w-full flex-col items-center justify-center ">
        <h3 className="my-2 text-2xl font-bold">Update Password</h3>
        <div className="w-full md:w-[80%]">
          <ESForm
            onSubmit={onSubmit}
            // resolver={zodResolver(userValidationSchema)}
          >
            <div className="py-3">
              <ESInput name="oldPassword" label="Old Password" size="sm" />
            </div>
            <div className="py-3">
              <ESInput name="newPassword" label="New Password" size="sm" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Update
            </Button>
          </ESForm>
        </div>
      </div>
    </Container>
  );
}
