import ProductDetailCard from "@/src/components/UI/ProductDetailCard";
import { getSingleProduct } from "@/src/services/ProductService";

const DetailProduct = async ({ params }: { params: { productId: string } }) => {
  const { data: product } = await getSingleProduct(params.productId);
  console.log(product);
  return (
    <div>
      <ProductDetailCard product={product} />
    </div>
  );
};

export default DetailProduct;
