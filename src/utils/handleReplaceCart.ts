"use client";
import { toast } from "sonner";

export const handleReplaceCart = (
  warning: { productId: string; shopId: string; message: string } | null
) => {
  if (warning) {
    localStorage.setItem(
      "cart",
      JSON.stringify([{ productId: warning.productId, shopId: warning.shopId }])
    );
    toast("Cart replaced successfully with the new product!");
  }
};
