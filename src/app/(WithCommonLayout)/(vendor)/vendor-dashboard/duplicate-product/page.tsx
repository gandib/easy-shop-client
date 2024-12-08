import ProductManageCard from "@/src/components/UI/ProductManageCard";
import { getAllCategory } from "@/src/services/CategoryService";
import { getSingleProduct } from "@/src/services/ProductService";
import { getUserByEmail } from "@/src/services/UserService";

const DuplicateProductPage = async () => {
  const { data: allCategory } = await getAllCategory();
  const { data: user } = await getUserByEmail();
  const { data: product } = await getSingleProduct(user?.shop?.product[0]?.id);

  return (
    <div>
      <ProductManageCard
        category={allCategory}
        shop={user?.shop}
        title="Duplicate"
        product={product}
      />
    </div>
  );
};

export default DuplicateProductPage;
