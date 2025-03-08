import Container from "@/src/components/UI/Shared/Container";
import UpdateShop from "@/src/components/UI/Dashboard/UpdateShop";
import { getUserByEmail } from "@/src/services/UserService";

const UpdateShopPage = async () => {
  const { data: singleUser } = await getUserByEmail();
  const shop = singleUser?.shop;

  return (
    <Container>
      <UpdateShop shop={shop} />
    </Container>
  );
};

export default UpdateShopPage;
