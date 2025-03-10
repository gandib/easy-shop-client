import CategoryDisplay from "@/src/components/UI/Home/Cards/CategoryDisplay";
import Hero from "@/src/components/UI/Hero";
import HomeFilteringSearchingCard from "@/src/components/UI/Home/HomeFilteringSearchingCard";
import HomeFlashSale from "@/src/components/UI/Home/HomeFlashSale";
import HomeSmartPhoneDisplay from "@/src/components/UI/Home/HomeSmartPhoneDisplay";
import NewsLetter from "@/src/components/UI/Home/NewsLetter";
import PrioritizeProducts from "@/src/components/UI/Home/PrioritizeProducts";
import ScrollToTop from "@/src/components/UI/Home/ScrollTopToBottomButton";
import { getAllCategory } from "@/src/services/CategoryService";
import {
  getAllProducts,
  getAllProductsByFollowedUser,
} from "@/src/services/ProductService";
import HomeBanner from "@/src/components/UI/Home/HomeBanner";

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

  return (
    <div className=" ">
      <Hero />
      <div className="container mx-auto max-w-7xl flex-grow px-6 min-h-screen">
        <PrioritizeProducts products={allPrioritizeProducts} />
        <HomeFlashSale />
        <CategoryDisplay category={allCategory} />
        <HomeBanner />
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
