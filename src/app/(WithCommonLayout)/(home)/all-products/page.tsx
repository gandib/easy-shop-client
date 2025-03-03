import AllProductsFilteringSearching from "@/src/components/UI/AllProductsFilteringSearching";
import Container from "@/src/components/UI/Container";
import { getAllProducts } from "@/src/services/ProductService";

type SearchParams = Promise<{ category: string }>;

const AllProducts = async (searchParams: { searchParams: SearchParams }) => {
  const category = (await searchParams.searchParams).category;
  const { data: allProducts } = await getAllProducts([
    { name: "category", value: category },
    { name: "limit", value: 8 },
  ]);

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">All Products</h1>
      <AllProductsFilteringSearching
        products={allProducts}
        fromShop="allProducts"
        category={category}
      />
    </Container>
  );
};

export default AllProducts;
