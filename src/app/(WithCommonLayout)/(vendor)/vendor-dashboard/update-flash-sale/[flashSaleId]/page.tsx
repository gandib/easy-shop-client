import FlashSaleManagementCard from "@/src/components/UI/FlashSaleManagementCard";
import { getSingleFlashSale } from "@/src/services/CouponAndFlashSaleService";

const UpdateFlashSale = async ({
  params,
}: {
  params: { flashSaleId: string };
}) => {
  const { data: flashSale } = await getSingleFlashSale(params?.flashSaleId);
  return (
    <div>
      <FlashSaleManagementCard title="Update" flashSale={flashSale} />
    </div>
  );
};

export default UpdateFlashSale;
