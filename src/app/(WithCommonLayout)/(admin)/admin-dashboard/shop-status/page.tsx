import ShopBlackListManageCard from "@/src/components/UI/ShopBlackListManageCard";
import { getAllShop } from "@/src/services/ShopService";

const ShopStatus = async () => {
  const { data: allShops } = await getAllShop();
  console.log(allShops);
  return (
    <div>
      <ShopBlackListManageCard shops={allShops} />
    </div>
  );
};

export default ShopStatus;
