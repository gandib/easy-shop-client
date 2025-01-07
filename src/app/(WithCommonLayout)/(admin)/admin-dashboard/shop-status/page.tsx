import Container from "@/src/components/UI/Container";
import ShopBlackListManageCard from "@/src/components/UI/ShopBlackListManageCard";
import { getAllShop } from "@/src/services/ShopService";

const ShopStatus = async () => {
  const { data: allShops } = await getAllShop();

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">Shop Status</h1>
      <ShopBlackListManageCard shops={allShops} />
    </Container>
  );
};

export default ShopStatus;
