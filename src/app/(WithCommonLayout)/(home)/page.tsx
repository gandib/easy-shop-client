import CategoryDisplay from "@/src/components/UI/CategoryDisplay";
import Container from "@/src/components/UI/Container";
import FlashSaleCard from "@/src/components/UI/FlashSaleCard";
import Hero from "@/src/components/UI/Hero";
import HomeFilteringSearchingCard from "@/src/components/UI/HomeFilteringSearchingCard";
import HomeFlashSale from "@/src/components/UI/HomeFlashSale";
import HomeSmartPhoneDisplay from "@/src/components/UI/HomeSmartPhoneDisplay";
import NewsLetter from "@/src/components/UI/NewsLetter";
import PrioritizeProducts from "@/src/components/UI/PrioritizeProducts";
import ScrollToTop from "@/src/components/UI/ScrollTopToBottomButton";
import { getAllCategory } from "@/src/services/CategoryService";
import {
  getAllProducts,
  getAllProductsByFollowedUser,
} from "@/src/services/ProductService";
import { IProduct } from "@/src/types";

const Home = async () => {
  const { data: allProducts } = await getAllProducts([
    { name: "limit", value: 10 },
  ]);
  const { data: allSmartsPhone } = await getAllProducts([
    { name: "limit", value: 10 },
    { name: "category", value: "Smarts Phone" },
  ]);

  const { data: allCategory } = await getAllCategory();
  const { data: allPrioritizeProducts } = await getAllProductsByFollowedUser([
    { name: "limit", value: 5 },
  ]);
  console.log(allPrioritizeProducts);
  return (
    <div className=" ">
      <Hero />
      <div className="container mx-auto max-w-7xl flex-grow px-6 min-h-screen">
        <PrioritizeProducts products={allPrioritizeProducts} />
        <HomeFlashSale />
        <CategoryDisplay category={allCategory} />
        <HomeSmartPhoneDisplay
          products={allSmartsPhone?.data}
          fromShop="home"
        />
        <HomeFilteringSearchingCard products={allProducts} fromShop="home" />
        <NewsLetter />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default Home;
