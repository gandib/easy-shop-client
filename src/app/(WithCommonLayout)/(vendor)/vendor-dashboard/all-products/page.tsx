import VendorProductCard from "@/src/components/UI/VendorProductCard";
import { getAllProductsByShopId } from "@/src/services/ProductService";

const AllProducts = async () => {
  const { data: allProducts } = await getAllProductsByShopId([
    { name: "limit", value: 10 },
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <VendorProductCard products={allProducts} />
    </div>
  );
};

export default AllProducts;
