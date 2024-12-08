import ProductManageCard from "@/src/components/UI/ProductManageCard";
import { getAllCategory } from "@/src/services/CategoryService";
import { getUserByEmail } from "@/src/services/UserService";

const AddProductPage = async () => {
  const { data: allCategory } = await getAllCategory();
  const { data: user } = await getUserByEmail();

  return (
    <div>
      <ProductManageCard category={allCategory} shop={user?.shop} title="Add" />
    </div>
  );
};

export default AddProductPage;
