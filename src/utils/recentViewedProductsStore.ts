export const recentViewedProductsStore = (productId: string) => {
  const getRecentProducts = localStorage.getItem("recentProducts");
  const parsedRecentProducts = getRecentProducts
    ? JSON.parse(getRecentProducts)
    : [];
  const recentProducts: { productId: string }[] = parsedRecentProducts;

  if (recentProducts.length === 0) {
    recentProducts.push({ productId });
    localStorage.setItem("recentProducts", JSON.stringify(recentProducts));
    return;
  }

  const productExists = recentProducts.some(
    (item) => item.productId === productId
  );
  if (productExists) {
    return;
  }

  if (recentProducts.length === 10) {
    recentProducts.shift();
  }
  recentProducts.push({ productId });
  localStorage.setItem("recentProducts", JSON.stringify(recentProducts));
};
