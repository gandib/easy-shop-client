import Container from "@/src/components/UI/Shared/Container";
import FlashSaleDisplayCard from "@/src/components/UI/Dashboard/FlashSaleDisplayCard";
import { getAllFlashSale } from "@/src/services/CouponAndFlashSaleService";
import { IFlashSale } from "@/src/types";

const AllFlashSale = async () => {
  const { data: allFlashSale } = await getAllFlashSale();
  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6">All Flash Sale</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {allFlashSale && allFlashSale.length > 0
          ? allFlashSale?.map((flashSale: IFlashSale) => (
              <FlashSaleDisplayCard flashSale={flashSale} key={flashSale?.id} />
            ))
          : "No flash sale to show!"}
      </div>
    </Container>
  );
};

export default AllFlashSale;
