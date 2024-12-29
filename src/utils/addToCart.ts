import { toast } from "sonner";

export const addToCart = (
  productId: string,
  shopId: string,
  setWarning: (message: string, productId: string, shopId: string) => void
) => {
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
    setWarning(
      "The product belongs to a different shop. Do you want to replace the current cart with the new product?",
      productId,
      shopId
    );
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
