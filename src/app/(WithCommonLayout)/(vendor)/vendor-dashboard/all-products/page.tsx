import Container from "@/src/components/UI/Shared/Container";
import VendorProductCard from "@/src/components/UI/Dashboard/VendorProductCard";
import { getAllProductsByShopId } from "@/src/services/ProductService";

const AllProducts = async () => {
  const { data: allProducts } = await getAllProductsByShopId([
    { name: "limit", value: 10 },
  ]);

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <VendorProductCard products={allProducts} />
    </Container>
  );
};

export default AllProducts;
