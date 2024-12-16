import CategoryDisplay from "@/src/components/UI/CategoryDisplay";
import Container from "@/src/components/UI/Container";
import FlashSaleCard from "@/src/components/UI/FlashSaleCard";
import HomeFilteringSearchingCard from "@/src/components/UI/HomeFilteringSearchingCard";
import HomeFlashSale from "@/src/components/UI/HomeFlashSale";
import ScrollToTop from "@/src/components/UI/ScrollTopToBottomButton";
import { getAllCategory } from "@/src/services/CategoryService";
import { getAllProducts } from "@/src/services/ProductService";
import { IProduct } from "@/src/types";

const Home = async () => {
  const { data: allProducts } = await getAllProducts([]);
  const { data: allCategory } = await getAllCategory();

  let flashSaleProducts = {
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

  flashSaleProducts.data = flashSaleProducts?.data?.slice(0, 3);

  return (
    <Container>
      <HomeFlashSale flashSale={flashSaleProducts} />
      <CategoryDisplay category={allCategory} />
      <HomeFilteringSearchingCard products={allProducts} fromShop="home" />
      <ScrollToTop />
    </Container>
  );
};

export default Home;
