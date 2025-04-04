import Container from "@/src/components/UI/Shared/Container";
import ProductManageCard from "@/src/components/UI/Dashboard/ProductManageCard";
import { getAllCategory } from "@/src/services/CategoryService";
import { getSingleProduct } from "@/src/services/ProductService";
import { getUserByEmail } from "@/src/services/UserService";

const DuplicateProductPage = async () => {
  const { data: allCategory } = await getAllCategory();
  const { data: user } = await getUserByEmail();
  // const { data: product } = await getSingleProduct(user?.shop?.product[0]?.id);
  return (
    <Container>
      <ProductManageCard
        category={allCategory}
        shop={user?.shop}
        title="Duplicate"
        product={user?.shop?.product[0]}
      />
    </Container>
  );
};

export default DuplicateProductPage;
