import Container from "@/src/components/UI/Shared/Container";
import ProductDetailCard from "@/src/components/UI/Dashboard/ProductDetailCard";
import { getSingleProduct } from "@/src/services/ProductService";

type Params = Promise<{ productId: string }>;

const DetailProduct = async (params: { params: Params }) => {
  const productId = (await params.params).productId;
  const { data: product } = await getSingleProduct(productId);

  return (
    <Container>
      <ProductDetailCard product={product} />
    </Container>
  );
};

export default DetailProduct;
