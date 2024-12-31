import VendorProductCard from "@/src/components/UI/VendorProductCard";
import { getAllProductsByShopId } from "@/src/services/ProductService";

const AllProducts = async () => {
  const { data: allProducts } = await getAllProductsByShopId([
    { name: "limit", value: 10 },
  ]);

  return (
    <div>
      <VendorProductCard products={allProducts} />
    </div>
  );
};

export default AllProducts;
