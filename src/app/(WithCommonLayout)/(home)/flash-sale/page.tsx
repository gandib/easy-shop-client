import Container from "@/src/components/UI/Container";
import FlashSaleCard from "@/src/components/UI/FlashSaleCard";
import { getAllProducts } from "@/src/services/ProductService";
import { IProduct } from "@/src/types";

const FlashSale = async () => {
  const { data: allProducts } = await getAllProducts([
    { name: "flash", value: "flash" },
  ]);

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-4">Flash Sale</h1>
      <FlashSaleCard products={allProducts} fromShop="flash" />
    </Container>
  );
};

export default FlashSale;
