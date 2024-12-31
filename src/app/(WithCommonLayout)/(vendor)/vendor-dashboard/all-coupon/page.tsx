import CouponDisplayCard from "@/src/components/UI/CouponDisplayCard";
import { getAllCoupon } from "@/src/services/CouponAndFlashSaleService";
import { ICoupon } from "@/src/types";

const AllCoupon = async () => {
  const { data: allCoupon } = await getAllCoupon();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Coupons</h1>
      <div className="grid grid-cols-2 gap-2">
        {allCoupon && allCoupon.length > 0
          ? allCoupon?.map((coupon: ICoupon) => (
              <CouponDisplayCard coupon={coupon} />
            ))
          : "No coupon to show!"}
      </div>
    </div>
  );
};

export default AllCoupon;
