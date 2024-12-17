import AllProductsFilteringSearching from "@/src/components/UI/AllProductsFilteringSearching";
import Container from "@/src/components/UI/Container";
import { getAllProducts } from "@/src/services/ProductService";

const AllProducts = async ({
  searchParams,
}: {
  searchParams: { category: string };
}) => {
  const { data: allProducts } = await getAllProducts([
    { name: "category", value: searchParams?.category },
    { name: "lomit", value: 9 },
  ]);

  return (
    <Container>
      <AllProductsFilteringSearching
        products={allProducts}
        fromShop="allProducts"
        category={searchParams?.category}
      />
    </Container>
  );
};

export default AllProducts;
