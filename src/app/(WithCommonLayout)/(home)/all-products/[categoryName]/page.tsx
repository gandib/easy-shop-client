import AllProductsFilteringSearching from "@/src/components/UI/AllProductsFilteringSearching";
import Container from "@/src/components/UI/Container";
import { getAllProducts } from "@/src/services/ProductService";

const AllProducts = async ({
  params,
}: {
  params: { categoryName: string };
}) => {
  const categoryName = decodeURIComponent(params?.categoryName || "");
  const { data: allProducts } = await getAllProducts([
    { name: "category", value: categoryName },
  ]);

  return (
    <Container>
      <AllProductsFilteringSearching
        products={allProducts}
        category={categoryName}
        fromShop="home"
      />
    </Container>
  );
};

export default AllProducts;
