import ProductDetailCard from "@/src/components/UI/ProductDetailCard";
import { getSingleProduct } from "@/src/services/ProductService";

type Params = Promise<{ productId: string }>;

const DetailProduct = async (params: { params: Params }) => {
  const productId = (await params.params).productId;
  const { data: product } = await getSingleProduct(productId);

  return (
    <div>
      <ProductDetailCard product={product} />
    </div>
  );
};

export default DetailProduct;
