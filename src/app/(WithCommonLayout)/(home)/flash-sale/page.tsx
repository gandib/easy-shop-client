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
      <FlashSaleCard products={allProducts} fromShop="flash" />
    </Container>
  );
};

export default FlashSale;
