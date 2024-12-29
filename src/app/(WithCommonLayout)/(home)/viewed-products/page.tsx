import Container from "@/src/components/UI/Container";
import RecentProductsCard from "@/src/components/UI/RecentProductsCard";
import { getAllProducts } from "@/src/services/ProductService";

const RecentProducts = async () => {
  const { data: products } = await getAllProducts([]);

  return (
    <Container>
      <div className="mb-8">
        <RecentProductsCard products={products} />
      </div>
    </Container>
  );
};

export default RecentProducts;
