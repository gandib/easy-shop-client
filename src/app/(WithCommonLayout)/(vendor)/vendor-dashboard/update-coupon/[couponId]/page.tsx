import CouponManagementCard from "@/src/components/UI/CouponManagementCard";
import { getSingleCoupon } from "@/src/services/CouponAndFlashSaleService";

const UpdateCoupon = async ({ params }: { params: { couponId: string } }) => {
  const { data: coupon } = await getSingleCoupon(params?.couponId);
  return (
    <div>
      <CouponManagementCard title="Update" coupon={coupon} />
    </div>
  );
};

export default UpdateCoupon;
