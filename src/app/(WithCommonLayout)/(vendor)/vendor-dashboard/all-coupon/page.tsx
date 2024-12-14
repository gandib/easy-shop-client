import CouponDisplayCard from "@/src/components/UI/CouponDisplayCard";
import { getAllCoupon } from "@/src/services/CouponAndFlashSaleService";
import { ICoupon } from "@/src/types";

const AllCoupon = async () => {
  const { data: allCoupon } = await getAllCoupon();
  return (
    <div>
      {allCoupon &&
        allCoupon.length > 0 &&
        allCoupon?.map((coupon: ICoupon) => (
          <CouponDisplayCard coupon={coupon} />
        ))}
    </div>
  );
};

export default AllCoupon;
