import Container from "@/src/components/UI/Container";
import FlashSaleManagementCard from "@/src/components/UI/FlashSaleManagementCard";
import { getSingleFlashSale } from "@/src/services/CouponAndFlashSaleService";

type Params = Promise<{ flashSaleId: string }>;

const UpdateFlashSale = async (params: { params: Params }) => {
  const flashSaleId = (await params.params).flashSaleId;
  const { data: flashSale } = await getSingleFlashSale(flashSaleId);
  return (
    <Container>
      <FlashSaleManagementCard title="Update" flashSale={flashSale} />
    </Container>
  );
};

export default UpdateFlashSale;
