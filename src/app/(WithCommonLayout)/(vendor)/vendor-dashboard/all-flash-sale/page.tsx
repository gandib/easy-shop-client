import FlashSaleDisplayCard from "@/src/components/UI/FlashSaleDisplayCard";
import { getAllFlashSale } from "@/src/services/CouponAndFlashSaleService";
import { IFlashSale } from "@/src/types";

const AllFlashSale = async () => {
  const { data: allFlashSale } = await getAllFlashSale();
  return (
    <div>
      {allFlashSale &&
        allFlashSale.length > 0 &&
        allFlashSale?.map((flashSale: IFlashSale) => (
          <FlashSaleDisplayCard flashSale={flashSale} />
        ))}
    </div>
  );
};

export default AllFlashSale;
