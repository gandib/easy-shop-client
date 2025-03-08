import Container from "@/src/components/UI/Shared/Container";
import ShopProductDetailCard from "@/src/components/UI/Home/Cards/ShopProductDetailCard";
import { getSingleProduct } from "@/src/services/ProductService";

type Params = Promise<{ productId: string }>;

const ShopProductDetail = async (params: { params: Params }) => {
  const productId = (await params.params).productId;
  const { data: product } = await getSingleProduct(productId);

  return (
    <Container>
      <ShopProductDetailCard product={product} />
    </Container>
  );
};

export default ShopProductDetail;
