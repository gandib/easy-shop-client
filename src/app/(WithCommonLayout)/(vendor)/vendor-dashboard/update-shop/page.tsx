import UpdateShop from "@/src/components/UI/UpdateShop";
import { getUserByEmail } from "@/src/services/UserService";

const UpdateShopPage = async () => {
  const { data: singleUser } = await getUserByEmail();
  const shop = singleUser?.shop;

  return (
    <div>
      <UpdateShop shop={shop} />
    </div>
  );
};

export default UpdateShopPage;
