import CouponDisplayCard from "@/src/components/UI/CouponDisplayCard";
import { getAllCoupon } from "@/src/services/CouponAndFlashSaleService";
import { ICoupon } from "@/src/types";

const AllCoupon = async () => {
  const { data: allCoupon } = await getAllCoupon();
  return (
    <div className="grid grid-cols-2 gap-2">
      {allCoupon && allCoupon.length > 0
        ? allCoupon?.map((coupon: ICoupon) => (
            <CouponDisplayCard coupon={coupon} />
          ))
        : "No coupon to show!"}
    </div>
  );
};

export default AllCoupon;
