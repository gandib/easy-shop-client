import CategoryDisplay from "@/src/components/UI/CategoryDisplay";
import Container from "@/src/components/UI/Container";
import HomeFilteringSearchingCard from "@/src/components/UI/HomeFilteringSearchingCard";
import { getAllCategory } from "@/src/services/CategoryService";
import { getAllProducts } from "@/src/services/ProductService";

const Home = async () => {
  const { data: allProducts } = await getAllProducts([]);
  const { data: allCategory } = await getAllCategory();

  return (
    <Container>
      <CategoryDisplay category={allCategory} />
      <HomeFilteringSearchingCard products={allProducts} fromShop="home" />
    </Container>
  );
};

export default Home;
