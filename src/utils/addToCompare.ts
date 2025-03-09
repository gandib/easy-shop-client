import { toast } from "sonner";

export const addToCompare = (
  productId: string,
  catId: string,
  setWarning2: (message: string, productId: string, catId: string) => void
) => {
  const getCart = localStorage.getItem("compare");
  const parsedCart = getCart ? JSON.parse(getCart) : [];
  const compare: { productId: string; catId: string }[] = parsedCart;

  if (compare.length === 0) {
    compare.push({ productId, catId });
    localStorage.setItem("compare", JSON.stringify(compare));
    toast("Successfully added to the compare!");
    return;
  }

  if (compare.length === 10) {
    compare.shift();
    compare.push({ productId, catId });
    localStorage.setItem("compare", JSON.stringify(compare));
    toast("Successfully added to the compare!");
    return;
  }

  const existingCatId = compare[0].catId;

  if (existingCatId !== catId) {
    setWarning2(
      "The product belongs to a different category. Do you want to replace the current compare with the new product?",
      productId,
      catId
    );
    return;
  }

  const productExists = compare.some((item) => item.productId === productId);
  if (productExists) {
    toast("Product is already in the compare!");
    return;
  }

  compare.push({ productId, catId });
  localStorage.setItem("compare", JSON.stringify(compare));
  toast("Successfully added to the compare!");
};
