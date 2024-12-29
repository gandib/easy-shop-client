import FlashSaleDisplayCard from "@/src/components/UI/FlashSaleDisplayCard";
import { getAllFlashSale } from "@/src/services/CouponAndFlashSaleService";
import { IFlashSale } from "@/src/types";

const AllFlashSale = async () => {
  const { data: allFlashSale } = await getAllFlashSale();
  return (
    <div className="grid grid-cols-2 gap-2">
      {allFlashSale && allFlashSale.length > 0
        ? allFlashSale?.map((flashSale: IFlashSale) => (
            <FlashSaleDisplayCard flashSale={flashSale} />
          ))
        : "No flash sale to show!"}
    </div>
  );
};

export default AllFlashSale;
