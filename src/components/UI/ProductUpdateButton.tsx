"use client";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/react";
import { Edit } from "lucide-react";
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
    <button
      className="bg-white text-black hover:bg-secondary-500 hover:text-white p-2 rounded-md"
      onClick={() => handleUpdate()}
    >
      <Edit size={18} />
    </button>
  );
};

export default ProductUpdateButton;
