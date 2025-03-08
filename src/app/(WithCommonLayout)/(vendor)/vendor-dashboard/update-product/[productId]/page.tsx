import Container from "@/src/components/UI/Shared/Container";
import ProductManageCard from "@/src/components/UI/Dashboard/ProductManageCard";
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
    <Container>
      <ProductManageCard
        category={allCategory}
        shop={user?.shop}
        title="Update"
        product={product}
      />
    </Container>
  );
};

export default UpdateProductPage;
