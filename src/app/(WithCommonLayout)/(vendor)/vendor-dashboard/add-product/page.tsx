import Container from "@/src/components/UI/Shared/Container";
import ProductManageCard from "@/src/components/UI/Dashboard/ProductManageCard";
import { getAllCategory } from "@/src/services/CategoryService";
import { getUserByEmail } from "@/src/services/UserService";

const AddProductPage = async () => {
  const { data: allCategory } = await getAllCategory();
  const { data: user } = await getUserByEmail();

  return (
    <Container>
      <ProductManageCard category={allCategory} shop={user?.shop} title="Add" />
    </Container>
  );
};

export default AddProductPage;
