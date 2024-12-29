"use client";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { use } from "react";

const ProductUpdateButton = ({ id }: { id: string }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const handleUpdate = () => {
    router.push(
      `${user?.role === "ADMIN" ? `/admin-dashboard/update-product/${id}` : `/vendor-dashboard/update-product/${id}`}`
    );
  };
  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <Button size="sm" onPress={() => handleUpdate()}>
      Update
    </Button>
  );
};

export default ProductUpdateButton;
