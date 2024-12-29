import FlashSaleManagementCard from "@/src/components/UI/FlashSaleManagementCard";
import { getSingleFlashSale } from "@/src/services/CouponAndFlashSaleService";

type Params = Promise<{ flashSaleId: string }>;

const UpdateFlashSale = async (params: { params: Params }) => {
  const flashSaleId = (await params.params).flashSaleId;
  const { data: flashSale } = await getSingleFlashSale(flashSaleId);
  return (
    <div>
      <FlashSaleManagementCard title="Update" flashSale={flashSale} />
    </div>
  );
};

export default UpdateFlashSale;
