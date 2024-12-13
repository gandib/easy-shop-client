import { confirmAlert } from "react-confirm-alert";
import { toast } from "sonner";

export const addToCart = (productId: string, shopId: string) => {
  const getCart = localStorage.getItem("cart");
  const parsedCart = getCart ? JSON.parse(getCart) : [];
  const cart: { productId: string; shopId: string }[] = parsedCart;

  if (cart.length === 0) {
    cart.push({ productId, shopId });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast("Successfully added to the cart!");
    return;
  }

  const existingShopId = cart[0].shopId;

  if (existingShopId !== shopId) {
    confirmAlert({
      title: "Different Shop Detected",
      message:
        "The product belongs to a different shop. Do you want to replace the current cart with the new product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            const newCart = [{ productId, shopId }];
            localStorage.setItem("cart", JSON.stringify(newCart));
            toast("Cart replaced successfully with the new product!");
          },
        },
        {
          label: "No",
          onClick: () => {
            toast("Cart remains unchanged.");
          },
        },
      ],
    });
    return;
  }

  const productExists = cart.some((item) => item.productId === productId);
  if (productExists) {
    toast("Product is already in the cart!");
    return;
  }

  cart.push({ productId, shopId });
  localStorage.setItem("cart", JSON.stringify(cart));
  toast("Successfully added to the cart!");
};
