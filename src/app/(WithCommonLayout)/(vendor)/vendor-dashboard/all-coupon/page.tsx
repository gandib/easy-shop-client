import Container from "@/src/components/UI/Container";
import CouponDisplayCard from "@/src/components/UI/CouponDisplayCard";
import { getAllCoupon } from "@/src/services/CouponAndFlashSaleService";
import { ICoupon } from "@/src/types";

const AllCoupon = async () => {
  const { data: allCoupon } = await getAllCoupon();
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">All Coupons</h1>
      <div className="grid grid-cols-2 gap-2">
        {allCoupon && allCoupon.length > 0
          ? allCoupon?.map((coupon: ICoupon) => (
              <CouponDisplayCard coupon={coupon} />
            ))
          : "No coupon to show!"}
      </div>
    </Container>
  );
};

export default AllCoupon;
