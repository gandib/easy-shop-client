import CategoryDisplay from "@/src/components/UI/CategoryDisplay";
import Container from "@/src/components/UI/Container";
import FlashSaleCard from "@/src/components/UI/FlashSaleCard";
import HomeFilteringSearchingCard from "@/src/components/UI/HomeFilteringSearchingCard";
import HomeFlashSale from "@/src/components/UI/HomeFlashSale";
import PrioritizeProducts from "@/src/components/UI/PrioritizeProducts";
import ScrollToTop from "@/src/components/UI/ScrollTopToBottomButton";
import { getAllCategory } from "@/src/services/CategoryService";
import {
  getAllProducts,
  getAllProductsByFollowedUser,
} from "@/src/services/ProductService";

const Home = async () => {
  const { data: allProducts } = await getAllProducts([
    { name: "limit", value: 8 },
  ]);
  const { data: allCategory } = await getAllCategory();
  const { data: allPrioritizeProducts } = await getAllProductsByFollowedUser([
    { name: "limit", value: 9 },
  ]);

  return (
    <Container>
      <PrioritizeProducts products={allPrioritizeProducts} />
      <HomeFlashSale />
      <CategoryDisplay category={allCategory} />
      <HomeFilteringSearchingCard products={allProducts} fromShop="home" />
      <ScrollToTop />
    </Container>
  );
};

export default Home;
