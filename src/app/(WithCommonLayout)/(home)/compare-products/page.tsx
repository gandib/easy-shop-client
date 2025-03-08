import CompareCard from "@/src/components/UI/Home/Cards/CompareCard";
import Container from "@/src/components/UI/Shared/Container";
import { getAllProducts } from "@/src/services/ProductService";

const CompareProducts = async () => {
  const { data: products } = await getAllProducts([]);

  return (
    <Container>
      <CompareCard products={products} />
    </Container>
  );
};

export default CompareProducts;
