import ShopBlackListManageCard from "@/src/components/UI/ShopBlackListManageCard";
import { getAllShop } from "@/src/services/ShopService";

const ShopStatus = async () => {
  const { data: allShops } = await getAllShop();

  return (
    <div>
      <ShopBlackListManageCard shops={allShops} />
    </div>
  );
};

export default ShopStatus;
