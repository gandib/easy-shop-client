"use client";

import ESForm from "@/src/components/form/ESForm";
import ESInput from "@/src/components/form/ESInput";
import { useUserRegistration } from "@/src/hooks/user.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { ChangeEvent, useEffect, useState } from "react";
import registerValidationSchema from "@/src/schemas/register.schemas";
import "../../../../src/styles/animation.css";
import ESSelect from "@/src/components/form/ESSelect";
import { useRouter } from "next/navigation";
import loginPic from "@/src/assets/login2.jpg";
import Image from "next/image";

export default function Register() {
  const {
    mutate: handleUserRagistration,
    isPending,
    isSuccess,
  } = useUserRegistration();
  const [vendor, setVendor] = useState("");
  const router = useRouter();

  const onSubmit = (data: FieldValues) => {
    if (data.role === "VENDOR") {
      setVendor(data.role);
    }

    handleUserRagistration(data);
  };

  if (isPending) {
    //handle loading state
  }

  if (isSuccess) {
    router.push("/vendor-dashboard");
  }

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="hidden lg:flex">
        <Image src={loginPic} width={1000} height={1000} alt="login" />
      </div>
      <div className="flex w-full flex-col items-center justify-center mb-12 min-h-screen">
        <h3 className="my-2 text-2xl font-bold">Register with Easy Shop</h3>
        <div className="md:w-[50%] lg:w-[60%] w-[80%]">
          <ESForm
            onSubmit={onSubmit}
            resolver={zodResolver(registerValidationSchema)}
          >
            <div className="py-3">
              <ESInput name="name" label="Name" size="sm" />
            </div>
            <div className="py-3">
              <ESInput name="email" type="email" label="Email" size="sm" />
            </div>
            <div className="py-3">
              <ESInput
                name="password"
                type="password"
                label="Password"
                size="sm"
              />
            </div>
            <div className="py-3">
              <ESSelect
                name="role"
                label="Role"
                options={[
                  { key: "USER", label: "USER" },
                  { key: "VENDOR", label: "VENDOR" },
                ]}
                size="sm"
              />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Registration
            </Button>
          </ESForm>
          <div className="text-center">
            Already have an account?{" "}
            <Link href={"/login"}>
              <span className="cursor-pointer hover:text-green-500">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
