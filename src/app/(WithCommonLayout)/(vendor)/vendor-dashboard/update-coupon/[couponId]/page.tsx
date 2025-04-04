import Container from "@/src/components/UI/Shared/Container";
import CouponManagementCard from "@/src/components/UI/Dashboard/CouponManagementCard";
import { getSingleCoupon } from "@/src/services/CouponAndFlashSaleService";

type Params = Promise<{ couponId: string }>;

const UpdateCoupon = async (params: { params: Params }) => {
  const couponId = (await params.params).couponId;
  const { data: coupon } = await getSingleCoupon(couponId);
  return (
    <Container>
      <CouponManagementCard title="Update" coupon={coupon} />
    </Container>
  );
};

export default UpdateCoupon;
