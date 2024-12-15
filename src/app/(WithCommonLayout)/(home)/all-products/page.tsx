import AllProductsFilteringSearching from "@/src/components/UI/AllProductsFilteringSearching";
import Container from "@/src/components/UI/Container";
import { getAllProducts } from "@/src/services/ProductService";

const AllProducts = async () => {
  const { data: allProducts } = await getAllProducts([]);

  return (
    <Container>
      <AllProductsFilteringSearching
        products={allProducts}
        fromShop="allProducts"
      />
    </Container>
  );
};

export default AllProducts;
