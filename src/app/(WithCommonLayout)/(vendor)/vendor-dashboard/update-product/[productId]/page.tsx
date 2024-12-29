import ProductManageCard from "@/src/components/UI/ProductManageCard";
import { getAllCategory } from "@/src/services/CategoryService";
import { getSingleProduct } from "@/src/services/ProductService";
import { getUserByEmail } from "@/src/services/UserService";

type Params = Promise<{ productId: string }>;

const UpdateProductPage = async (params: { params: Params }) => {
  const productId = (await params.params).productId;
  const { data: allCategory } = await getAllCategory();
  const { data: user } = await getUserByEmail();
  const { data: product } = await getSingleProduct(productId);

  return (
    <div>
      <ProductManageCard
        category={allCategory}
        shop={user?.shop}
        title="Update"
        product={product}
      />
    </div>
  );
};

export default UpdateProductPage;
