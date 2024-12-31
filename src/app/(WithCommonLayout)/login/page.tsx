"use client";

import ESForm from "@/src/components/form/ESForm";
import ESInput from "@/src/components/form/ESInput";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useForgetPassword, useUserlogin } from "@/src/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useEffect, useState } from "react";
import loginValidationSchema from "@/src/schemas/login.schemas";
import "../../../../src/styles/animation.css";

const Login = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect");
  const router = useRouter();
  const { setIsLoading } = useUser();
  const [error, setError] = useState("");

  const { mutate: handleUserLogin, isPending, isSuccess } = useUserlogin();
  const { mutate: handleForgetPassword } = useForgetPassword();

  const { register, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: { email: "", password: "" },
  });

  const email = watch("email");
  const password = watch("password");

  const onSubmit = (data: FieldValues) => {
    handleUserLogin(data);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      const target = redirect || "/";
      router.push(target);
    }
  }, [isPending, isSuccess, redirect, router]);

  const recoverPassword = (email: string) => {
    const data = { email };
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      setError("Please enter a valid email!");
    } else {
      setError("");
      handleForgetPassword(data);
    }
  };

  return (
    <div className="min-h-screen">
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Login with Easy Shop</h3>
        <p>Welcome Back! Let&lsquo;s Get Started</p>
        <div className="flex p-2">
          <p className="font-bold">Credential:</p>
          <Button
            onPress={() => {
              setValue("email", "user@gmail.com");
              setValue("password", "123456");
            }}
            size="sm"
            className="mx-2 bg-primary-500 text-white"
          >
            User
          </Button>
          <Button
            onPress={() => {
              setValue("email", "vendor@gmail.com");
              setValue("password", "123456");
            }}
            size="sm"
            className="mr-2 bg-secondary-500 text-white"
          >
            Vendor
          </Button>
          <Button
            onPress={() => {
              setValue("email", "admin2@gmail.com");
              setValue("password", "123456");
            }}
            size="sm"
            className="bg-purple-600 text-white"
          >
            Admin
          </Button>
        </div>
        <div className="md:w-[50%] lg:w-[35%] w-[80%]">
          <ESForm onSubmit={handleSubmit(onSubmit)}>
            <div className="py-3">
              <ESInput
                {...register("email")}
                name="email"
                type="email"
                label="Email"
                value={email} // Make the input controlled
              />
            </div>
            <span className="text-sm text-rose-600">{error}</span>
            <div className="py-3">
              <ESInput
                {...register("password")}
                name="password"
                type="password"
                label="Password"
                value={password} // Make the input controlled
              />
            </div>

            <div className="py-3">
              <p
                className="cursor-pointer hover:text-green-500"
                onClick={() => recoverPassword(email)}
              >
                Forgot Password?
              </p>
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </ESForm>
          <div className="text-center">
            Don&lsquo;t have an account?{" "}
            <Link href={"/register"}>
              <span className="cursor-pointer hover:text-green-500">
                Register
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
