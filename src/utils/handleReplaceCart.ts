"use client";
import { toast } from "sonner";

export const handleReplaceCart = (
  warning: {
    productId: string;
    shopId?: string;
    catId?: string;
    message: string;
  } | null
) => {
  if (warning) {
    if (warning.catId) {
      localStorage.setItem(
        "compare",
        JSON.stringify([{ productId: warning.productId, catId: warning.catId }])
      );
      return toast("Compare cart replaced successfully with the new product!");
    }

    localStorage.setItem(
      "cart",
      JSON.stringify([{ productId: warning.productId, shopId: warning.shopId }])
    );
    return toast("Cart replaced successfully with the new product!");
  }
};
