import Container from "@/src/components/UI/Container";
import RecentProductsCard from "@/src/components/UI/RecentProductsCard";
import { getAllProducts } from "@/src/services/ProductService";

const RecentProducts = async () => {
  const { data: products } = await getAllProducts([]);

  return (
    <Container>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Viewed Products</h1>
        <RecentProductsCard products={products} />
      </div>
    </Container>
  );
};

export default RecentProducts;
