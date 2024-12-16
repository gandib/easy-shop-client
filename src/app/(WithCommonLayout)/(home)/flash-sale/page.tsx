import Container from "@/src/components/UI/Container";
import FlashSaleCard from "@/src/components/UI/FlashSaleCard";
import { getAllProducts } from "@/src/services/ProductService";
import { IProduct } from "@/src/types";

const FlashSale = async () => {
  const { data: allProducts } = await getAllProducts([]);
  const flashSaleProducts = {
    meta: {
      ...allProducts?.meta,
      total: allProducts?.data?.some(
        (product: IProduct) => product?.flashSale?.length
      )
        ? 1
        : 0,
    },
    data: allProducts?.data?.filter(
      (product: IProduct) => product?.flashSale?.length > 0
    ),
  };

  return (
    <Container>
      <FlashSaleCard products={flashSaleProducts} fromShop="flash" />
    </Container>
  );
};

export default FlashSale;
