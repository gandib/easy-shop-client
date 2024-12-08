import ProductManageCard from "@/src/components/UI/ProductManageCard";
import { getAllCategory } from "@/src/services/CategoryService";
import { getSingleProduct } from "@/src/services/ProductService";
import { getUserByEmail } from "@/src/services/UserService";

const UpdateProductPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const { data: allCategory } = await getAllCategory();
  const { data: user } = await getUserByEmail();
  const { data: product } = await getSingleProduct(params?.productId);

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
