import ShopBlackListManageCard from "@/src/components/UI/ShopBlackListManageCard";
import { getAllShop } from "@/src/services/ShopService";

const ShopStatus = async () => {
  const { data: allShops } = await getAllShop();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shop Status</h1>
      <ShopBlackListManageCard shops={allShops} />
    </div>
  );
};

export default ShopStatus;
