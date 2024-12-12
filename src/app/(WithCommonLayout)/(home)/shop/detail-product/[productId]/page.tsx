import Container from "@/src/components/UI/Container";
import ShopProductDetailCard from "@/src/components/UI/ShopProductDetailCard";
import { getSingleProduct } from "@/src/services/ProductService";

const ShopProductDetail = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { data: product } = await getSingleProduct(params.productId);
  console.log(product);
  return (
    <Container>
      <ShopProductDetailCard product={product} />
    </Container>
  );
};

export default ShopProductDetail;
