"use client";

import { useDeleteProduct } from "@/src/hooks/product.hook";
import { Button } from "@nextui-org/react";
import { Delete, Trash } from "lucide-react";

const ProductDeleteButton = ({ id }: { id: string }) => {
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDelete = () => {
    const deleteProductData = {
      id,
      data: {
        isDeleted: true,
      },
    };
    deleteProduct(deleteProductData);
  };

  if (isPending) {
    <p>Loading...</p>;
  }

  return (
    <button
      onClick={() => handleDelete()}
      className="bg-white text-danger-500 hover:bg-danger-500 hover:text-white p-2 rounded-md"
    >
      <Trash size={18} />
    </button>
  );
};

export default ProductDeleteButton;
