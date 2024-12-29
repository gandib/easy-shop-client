"use client";

import { useDeleteProduct } from "@/src/hooks/product.hook";
import { Button } from "@nextui-org/react";

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
    <Button size="sm" onPress={() => handleDelete()} className="bg-danger-500">
      Delete
    </Button>
  );
};

export default ProductDeleteButton;
