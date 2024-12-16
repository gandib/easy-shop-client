import Container from "@/src/components/UI/Container";
import RecentProductsCard from "@/src/components/UI/RecentProductsCard";
import { getAllProducts } from "@/src/services/ProductService";
import { IProduct } from "@/src/types";

const RecentProducts = async () => {
  const { data: products } = await getAllProducts([]);

  return (
    <Container>
      <RecentProductsCard products={products} />
    </Container>
  );
};

export default RecentProducts;
